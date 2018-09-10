const workerTemplate = config => `
  const {workerEventLoop} = require("${config.loop.path}")
  const loopConfig = JSON.parse(${JSON.stringify(config.loop.args)})
  const target = new workerEventLoop(loopConfig)
  ${config.modules.map(m => `
    const ${m.name} = require("${m.path}")
    const modConfig = JSON.parse(${JSON.stringify(m.config)})
    ${m.name}.attach(modConfig)(target)
  `)}
`

module.exports = {workerTemplate} 