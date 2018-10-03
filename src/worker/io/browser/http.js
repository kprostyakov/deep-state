const httpGate = events => 
  this.on(events.in, ev => {
    fetch(ev.to.host, {
      body: JSON.stringify(ev.msg),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then((resp)=>resp.json()).then(obj => {
      this.emit(events.out, obj)
    })
  })

export default httpGate