const log = length => {
  lines = []
  const handler = event =>
  this.on(event, msg => {
    if (lines.length > length) lines.shift()
    lines.push(msg.data)
  })
  return handler
}

export default log