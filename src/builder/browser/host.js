const worker = new Worker('worker.js')

const send = message => worker.postMessage(message)

let handlers = {}

worker.onmessage(ev => (ev.data.name in handlers)?handlers[ev.data.name](ev.data):null)

const on = (name, func) => handlers[name] = func

