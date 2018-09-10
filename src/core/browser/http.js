const attach = cfg => target => 
  target.addEventListener(cfg.event.in, ev => {
    fetch(ev.detail.to.host, {
      body: JSON.stringify(ev.detail.msg),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then((resp)=>resp.json()).then(obj => {
      const result = new CustomEvent(cfg.event.out, { detail: obj })
      target.dispatchEvent(result)
    })

  })