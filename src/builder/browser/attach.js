const fs = require("fs")

const attachContext = (name, path, cfg) => {
  const contextString = `const context = ${JSON.stringify(cfg)}`
  const func = fs.readFileSync(path)
  return `
    const ${name} = target => {
      ${contextString}
      ${func}
      return attach(context)(target)
    }
  `
}

module.exports = {
  attachContext
}