const validate = (obj, schema) => {
  for(let prop in schema) {
    if (!schema[prop].valid(obj)) return schema[prop].error
  }
  return true
}

export default validate



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

export default validate



const builderInput = msg => {
  let predicate = false
  let error = ''
  switch(msg.data.action){
    case 'merge':
      predicate = "basePath" in msg.data.context && msg.data.deps.length > 0
      error = 'wrong merge arguments'
  }
  return {valid: predicate, error}
}

