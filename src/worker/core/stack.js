const initStack = rules => {

  const mergeFrame = (to, from) => {
    let data = ('data' in to)?{...to.data, ...from.result}:{...from.result}
    return ({...to, data, id: from.id})
  }

  const pop = msg => {
    let messages = []
    if ('stack' in msg) {
      if ('result' in msg) {
        if (Array.isArray(msg.stack)) {
          messages = msg.stack.map(m => (mergeFrame(m, msg)))
        } else if ('end' in msg.stack) {
          iterationKey = Object.keys(msg.stack).filter(key => key != 'end' )[0]
          if (cfg.predicates[iterationKey](msg.result)) {
            messages.push(mergeFrame(msg, msg))
          } else {
            messages.push(mergeFrame(msg.stack, msg))
          }
        } else if ('name' in msg.stack) {
          messages.push(mergeFrame(msg.stack, msg))
        } else {
          Object.keys(msg.stack).forEach((key) => {
            if (cfg.predicates[key](msg.result)) {
              messages.push(mergeFrame(msg.stack, msg))
            }
          })
        }
      }
    }
    return messages
  }
  return pop(msg)
}

export default initStack