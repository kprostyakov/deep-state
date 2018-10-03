//const worker = new Worker('worker.js')
const messageAPI = worker => {
  let handlers = {}
  worker.onmessage(ev => (ev.data.name in handlers)?handlers[ev.data.name](ev.data):null)

  const on = (name, func) => handlers[name] = func
  const send = message => worker.postMessage(message)

  return ({on, send})
}

export default messageAPI