const initEventLoop = state => {

  class EventLoop extends EventTarget {
    constructor(state) {
      super();
      this.state = {...state}
    }

    on(event, handler) {
      this.addEventListener(event, e => handler(e.detail))
    }
    
    emit(event, payload) {
      this.dispatchEvent(new CustomEvent(event, {detail: payload}))
    }
  }
  return EventLoop(state)
}

export default initEventLoop