const route = config => target => {

  const routes = []

  const findByDest = e => routes.findIndex(entry => entry.dest == e.dest)

  target.on(config.event.route.add, e => routes.push(e))

  target.on(config.event.route.remove, e => {
    const ind = findByDest(e)
    if (ind >= 0) routes.splice(ind,1)
  })

  target.on(config.event.route.find, e => {
    const ind = findByDest(e)
    const route = (ind >= 0)?routes[ind]:{error: 'unknown route'}
    target.emit(config.event.route.found, route)
  })
}

export default route