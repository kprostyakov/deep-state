const fs = require("fs")
const attachContext = require('attach.js')

const workerTemplate = config => `
  ${fs.readFileSync(config.loop.path)}
  const target = new workerEventLoop()
  ${config.modules.map(m => `
    ${attachContext(m.name, m.path, m.config)}
    ${m.name}(target)
  `)}
`

module.exports = {workerTemplate} 