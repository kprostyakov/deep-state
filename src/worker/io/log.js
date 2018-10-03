set log(msg) {
  if (this.nodeLog.length > this.cfg.log.length) {
    this.nodeLog.shift()
  }
  this.nodeLog.push(msg.data)
}