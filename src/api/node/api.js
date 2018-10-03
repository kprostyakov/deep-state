const messageAPI = () => {
  const handlers = {}

  process.on('message', message => (message.name in handlers)?handlers[message.name](message):null)

  const on = (name, func) => handlers[name] = next(func)
  const send = message => process.send(message)

  return ({on, send})
}

module.exports = messageAPI