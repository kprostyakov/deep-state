const attach = cfg => target => {
  process.on('message', msg => target.emit(cfg.event.in, msg))
  target.on(cfg.event.out, e => process.send(e))
}

module.exports = {
  attach
}