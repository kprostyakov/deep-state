const initIPC = events => {
  onmessage(e => this.emit(events.in, e.data))
  this.on(events.out, e => postMessage(e))
}

export default initIPC