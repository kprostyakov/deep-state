const EventEmitter = require('events')

class queuedEventEmitter extends EventEmitter {
  constructor(cfg){
    this.cfg = {...cfg}
    this.queue = []
    this.errors = []
    this.nodeLog = []
  }

  set in(msg) {
    if ('pending' in msg && Array.isArray(msg.pending) && msg.pending.length>0){
      this.queue.push(msg) 
    }
    if ('child' in msg) {
      const msgIndex = this.queue.findIndex(m => (m.id == msg.id))
      if (msgIndex >= 0) {
        let parent = this.queue[msgIndex]
        const depIndex = parent.pending.findIndex(m => (m == msg.child))
        if (depIndex >= 0) {
          parent.pending.splice(depIndex,1)
          parent.data[msg.child] = msg.data
          if (parent.pending.length == 0) {
            this.queue.splice(msgIndex, 1)
            this.emit(cfg.event.out, parent)
          }
        }
      }
    } 
    this.emit(cfg.event.out, msg) 
  }

  set err(msg) {
    if (this.errors.length > this.cfg.errors.length) {
      this.errors.shift()
    }
    this.errors.push(msg.data)
  }
  
  set log(msg) {
    if (this.nodeLog.length > this.cfg.log.length) {
      this.nodeLog.shift()
    }
    this.nodeLog.push(msg.data)
  }
}