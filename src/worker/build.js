const workerTemplate = config => `
  const {WorkerEventLoop} = require("${config.loop.path}")
  const target = new W orkerEventLoop()
  ${config.loop.stack.map(f => `
    const _${f.name} = import("${f.path}")
    const modConfig = JSON.parse(${JSON.stringify(f.args)})
    const ${f.name} = _${f.name}(modConfig)
  `)}
  const stack = (msg)=>${config.loop.stack.reduce((pr,cr)=>`
  ${cr.name}(${pr.name})
  `,'msg')}
  const loopIO = import("${config.loop.io.path}")
  const loopConfig = JSON.parse(${JSON.stringify(config.loop.io.args)})
  const loop = loopIO(stack)(loopConfig)
  ${config.modules.map(m => `
    const {${m.name}} = import("${m.path}")
    const modConfig = JSON.parse(${JSON.stringify(m.args)})
    ${m.name}.call(target, modConfig)
  `)}
`

module.exports = {workerTemplate} 