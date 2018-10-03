const loop = process => events => 
  events.forEach(ev => this.on(ev.out, msg => {
    const {out, dest} = process(msg)
    this.emit(dest, out)
  }))

export default loop