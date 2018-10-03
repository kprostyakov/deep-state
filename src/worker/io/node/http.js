import id from '../lib/id.js'
import streams from '../lib/streams.js'

const httpGate = extPort => events => {

  const http = require('http')
  
  const requests = {}

  const postRequest = (options, payload) => new Promise ((resolve, reject) => {
    let req = http.request({method: 'POST', ...options})
    req.on('response', res => resolve(res))
    req.on('error', err => reject(err))
    req.write(payload)
    req.end()
  })

  http.createServer((req, res) => {
    const {method, url} = req
    
    if (method == 'POST') {
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        const message = JSON.parse(body)
        this.emit(events.in, message)
        res.end()
      });
    }
    if (method == 'GET') {
      const newId = id()
      requests[newId] = res
      this.emit(events.in, {
        name: 'get-request',
        id: newId,
        data: {
          terms: url.split('/')
        }
      })
    }
  }).listen(extPort)

  this.on(events.out, (message) => {
    if (message.id in requests) {
      const storedRes = requests[message.id]
      delete requests[message.id]
      const resStream = streams(message.cur.type)(message.cur.source)
      resStream.pipe(storedRes)
    } else {
      const payload = JSON.stringify(message)
      postRequest({
        host: message.to.host,
        port: message.to.port,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
      }, 
    }, payload)
  }
  })
}

export default httpGate