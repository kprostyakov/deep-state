const initIPC = events => {
  process.on('message', msg => this.emit(events.in, msg))
  this.on(events.out, e => process.send(e))
}

export default initIPC