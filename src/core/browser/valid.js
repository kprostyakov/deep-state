const attach = cfg => target => {
  target.addEventListener(cfg.local.event.in, e => {
    const variants = cfg.local.allowed.filter(msg => msg.name == e.detail.name)
    if (variants.length == 0) target.dispatchEvent(new CustomEvent(cfg.local.event.out, {detail: { error: 'outgoing message not in config'}}))
  })

  target.addEventListener(cfg.remote.event.in, e => {
    const obj = e.detail
    const accepted = ('name' in obj) && (cfg.remote.allowed.filter(msg => msg.name == obj.name).length>0)
    if (!accepted) target.dispatchEvent(new CustomEvent(cfg.remote.event.out, {detail: { error: 'received unexpected message' }})) 
  })
}