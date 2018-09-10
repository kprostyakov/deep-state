const attach = config => target => {

  const http = require('http')

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
        target.emit(config.event.in, message)
        res.end()
      });
    }
    if (method == 'GET') target.emit(config.event.out, {
      name: 'blob-requested',
      context: res,
      data: {
        terms: url.split('/')
      }
    })
  }).listen(config.port)


  target.on(config.event.out, (message) => {
    if ('context' in message) message.data.pipe(message.context)
    else {
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

module.exports = {
  attach
}