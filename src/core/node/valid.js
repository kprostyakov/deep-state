const attach = cfg => target => {
  target.on(cfg.local.event.in, e => {
    const variants = cfg.local.allowed.filter(msg => msg.name == e.detail.name)
    if (variants.length == 0) target.emit(cfg.local.event.out, {error: 'outgoing message not in config'})
  })

  target.on(cfg.remote.event.in, e => {
    const accepted = ('name' in e) && (cfg.remote.allowed.filter(msg => msg.name == e.name).length>0)
    if (!accepted) target.emit(cfg.remote.event.out, {error: 'received unexpected message' })
  })
}

module.exports = {
  attach
}