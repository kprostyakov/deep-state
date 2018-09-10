This project implements a distributed stack machine over a unidirectional message passing graph. Graph includes client (browser) and server nodes. Both server and client code are presented with same message API and are built and deployed using same generic code.

A message captures execution order with fields for 'current' function args/result, 'previous' results and a tree of 'future' messages in a 'next' property. 
Messages are originated at browser nodes, and translated into stack tree at a server node. This tree is eventually  spread via system as messages are pruned from the 'next' tree top upon execution. A mechanism for reducing the tree back into single response message is provided via queue structure embedded into each service node.

The messages are divided into namespaces. Translation tables are provided for inter-namespace calls. This way we can enforce security, as browser code would only have a limited selection of RPC verbs available. Client messages are translated to sequences of verbs in internal vocabulary at ingress service. Incoming HTTP requests are held in ingress service as a kind of 'stack frame' until resolving payload message is received from upstream service chain or timeout occurs.

Because messages are transmitted one-way, the future execution flow is held in a recursive message structure. Messages can be nested using special JSON conventions to support basic flow idioms, like chaining (serial execution), fan-out (parallel), pattern match branching+iteration. On message reception, only outer-most message payload is validated and RPC method invoked. After message is processed, output is either passed to the next stack element in message or is merged into input and message is re-sent if iteration is specified in stack description and message passes an iteration check.

Branching of messages produces an expanding tree of function invocations. To send the single message over HTTP back to client (via response still waiting at ingress) this tree would need to be reduced back to single message. Eventual reduction of this tree happens when several messages with same stack id are send to single recipient. It is up to recipient to join incoming content based on id and dependencies field.

Generic deployment includes dependency resolution, artefact building and deployment. Client-side deployment code is generated during server-side deployment using same generic code. Then all matching GET requests to ingress service are treated as clinet code deployment triggers. 
Server-side services are deployed as forked Node.js process groups, one group per TCP port/container. Within group perimeter messaging is executed via Node process API, inter-group transport is initially done via one-way POST HTTP requests, but other transport options like Web Sockets will be added later.

To use the tools with your own codebase you will need a description of your service/message graph as per JSON file in ./example directory. You will need to provide validation functions for each message type, as well as custom deployment-related code (bundling/container creation). These functions are referenced in the configuration file. You will also need to modify your code to use 'send' / 'on' API for state transfer.

Once configuration file is written, you can run the tool over your code base. Deploy process is run by sending a POST request with desired system configuration JSON in body to bootstrap server. It will build and inject appropriate transport and validation bindings into your code, build images and deploy them to specified hosts.

Assumed project folder structure:
/namespaceA
  /valid.js         (message type checkers/validators)
  /flow.js          (predicate functions used in flow control)
  /namespaceB.json  (translation from namespaceB)
  /src              (namespaced module code)
/namespaceB
/make.json          (describes deploy units (service groups linked via local IPC), valid input and output messages for each service in group)
/make.js            (deploy effects functions, named as per dependency tree entries)



