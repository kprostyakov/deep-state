const {createReadStream, createWriteStream} = require('fs')
const {builderInput} = require('../valid.js')


const fillTemplate = (from, to, cfg, cb) => {
  const template = require(from)
  const sink = createWriteStream(to)
  sink.end(template(cfg))
  sink.on('finish', cb)
}

/*Payload in msg.cur includes fields:
target - result object {type: 'file', path: 'rel.path'}
deps - pre-conditions
action - what to do
context - extra args needed by action
*/
const builder = config => events => {
  this.on(events.in, (msg => {

    let action, args = []

    const {valid, error} = builderInput(msg)
    const onend = result => ({
      action: messageAPI.send,
      ok: {...msg, data: {...result}, target: }
    })

    const root = msg.cur

    if (valid) {
      switch(msg.cur.action){
        case "template":
        fillTemplate(root.context.basepath+dep))
        const sink = createWriteStream(root.context.basepath+root.args.target)
        args = [sources, sink, onend({result: root.args.target})]
        break

        case "webpack":
        break
        case "deploy":
        break
      }
    } else {
      action = this.emit
      args = ['builder.error', {error}]
    }



  }))
  return ({
    actions: ["template", "webpack", "deploy"]
  })
}