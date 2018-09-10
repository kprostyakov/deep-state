

const splitConfig = (svc, services, messages) => {

  const joinServicesOnName = name => services.filter(s => s.listen.filter(l => l==name).length>0)[0]

  const joinMessagesOnName = name => messages.filter(m => m.name==name)[0]

  return ({
    external: {
      name: svc.name,
      host: svc.host,
      port: svc.port,
      path: svc.path,
      entryPoint: svc.entryPoint
    },
    internal: {
      name: svc.name,
      dispatch: svc.dispatch.map(msg=>({
        name: msg.name,
        schema: joinMessagesOnName(msg.name).schema,
        to: {
          host: joinServicesOnName(msg.name).host,
          port: joinServicesOnName(msg.name).port
        }
      })),
      listen: svc.listen.map(name => ({
        name,
        schema: joinMessagesOnName(msg.name).schema
      }))
    }
  })
}

const services = graph.services.forEach(svc=>splitConfig(svc, graph.services, schema.messages))

const hosts = new Set(services.map(svc => svc.external.host))

const svcGroups = [...hosts].map(host => services.filter(svc => svc.external.host == host))

const groupTasks = svcGroups.map(group => groupDeployTasks(group))

//outcome = await Promise.all(execTasks(tasks))