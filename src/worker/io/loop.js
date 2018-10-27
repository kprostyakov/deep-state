const loop = process => events => 
  events.forEach(ev => this.on(ev.out, msg => {
    const replies = process({src: ev.out, msg})
    replies.forEach(payload => this.emit(payload.dest, payload.msg))
  }))

export default loop