const {createReadStream, createWriteStream} = require('fs')
const {builderInput} = require('../valid.js')


const mergeStreams = (sources, sink, onend) => {
  
  const dump = (s, cb) => {
    s.pipe(sink, {end: false})
    s.once('end', cb) 
  }

  let pos = 0
  const iter = () => {
    if (pos==sources.length) {
      sink.emit('end')
      onend.action(onend.ok)
    }
    else dump(sources[pos], iter)

    pos++
  }

}

const eventAPI = {
  build: 'builder-task'
}

/*Payload in msg.data includes fields:
target - result object {type: 'file', path: 'rel.path'}
deps - pre-conditions
action - what to do
context - extra args needed by action
*/

messageAPI.on(eventAPI.build, (msg => {

  let action, args = []

  const {valid, error} = builderInput(msg)
  const onend = result => ({
    action: messageAPI.send,
    ok: {...msg, data: {...result}, target: }
  })

  const root = msg.data

  if (valid) {
    switch(root.action){
      case "merge":
      action = mergeStreams
      const sources = root.deps.map(dep => createReadStream(root.context.basepath+dep))
      const sink = createWriteStream(root.context.basepath+root.args.target)
      args = [sources, sink, onend({result: root.args.target})]
      break

      case "copy":
      break
      case "exec":
      break
    }
  } else {
    action = messageAPI.send
    args = ['builder.error', {error}]
  }

  action(...args)

}))
