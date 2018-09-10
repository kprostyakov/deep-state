const builderInput = msg => {
  let predicate = false
  let error = ''
  switch(msg.data.action){
    case 'merge':
      predicate = "basePath" in msg.data.context && msg.data.deps.length > 0
      error = 'wrong merge arguments'
  }
  return {valid: predicate, error}
}

module.exports = {
  builderInput
}