const initEventLoop = state => {

  const EventEmitter = require('events')

  class EventLoop extends EventEmitter {
    constructor(state){
      super()
      this.state = {...state}
    }
  }
  return new EventLoop(state)
}

export default initEventLoop