const EventEmitter = require('events').EventEmitter
const coreLoop = new EventEmitter()


const buildPreParser = require('stage1/parser.js')
const initHandlers = require('stage1/builder.js')

let routes = [{'init': 'local'}]

coreLoop.on('msg', msg => {
  //look up destination
  if (msg.name in routes) {
    const namespace = routes[msg.name].split('.')[0]
    switch (namespace) {
      case 'local':
      coreLoop.emit('msg', initHandlers[msg.name](msg))
      break
      default:
      //
      break
    }

  }
  //send
})

coreLoop.on('raw', msg => {
  coreLoop.emit('msg', translate(msg))
})


coreLoop.on('init', config => {
  const preParser = buildPreParser(config)
})

const config = require(process.argv[2])
coreMsgLoop.emit('init', config)


const buildBinding = () => `
const { spawn } = require('child_process')
const child = spawn('worker.js')


`

const startupScript = entryPoint => `
fork()

`

module.exports = startupScript



const workers = {
  browser: require('./browser'),
  node: require('./node')
}

const hostType = name => name == 'browser'?'browser':'node'

const deployEffects = (binding, config) => {
  switch (hostType(config.host)){
    case 'browser':
      //run webpack etc
    case 'node':
     // if there is a Dockerfile, build image and deploy
    
     // else append to startup script
  }
}

const groupDeployTasks = svcGroup => {

  const bindings = {
    browser: browserWorker,
    node: nodeWorker
  }

  const binding = bindings[hostType(svcGroup[0].external.host)]
  //actions: {name: 'writeFile', data:{path, content}}
  const actions = svcGroup.map(svcConfig => {
    const {internal, external} = svcConfig
    const deps = await Promise.all(collectDeps[svc.name])
    const artefact = buildArtefact[svc.name](deps)
    const outcome = await deploymentScript[svc.name](artefact) 
    deployEffects(binding, external)
  })
}
module.exports = groupDeployTasks