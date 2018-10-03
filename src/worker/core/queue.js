const initQueue = () => {
  let q = []
  const queue = msg => {
    if ('pending' in msg && Array.isArray(msg.pending) && msg.pending.length>0){
      q.push(msg) 
    }
    if ('child' in msg) {
      const msgIndex = q.findIndex(m => (m.id == msg.id))
      if (msgIndex >= 0) {
        let parent = q[msgIndex]
        const depIndex = parent.pending.findIndex(m => (m == msg.child))
        if (depIndex >= 0) {
          parent.pending.splice(depIndex,1)
          parent.data[msg.child] = msg.data
          if (parent.pending.length == 0) {
            q.splice(msgIndex, 1)
            return(parent)
          }
        }
      }
    } 
    return(msg) 
  }
  return queue
}

export default initQueue