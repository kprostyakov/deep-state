const error = length => {
  errors = []
  const handler = event =>
  this.on(event, msg => {
    if (errors.length > length) errors.shift()
    errors.push(msg.data)
  })
  return handler
}

export default error