const attach = cfg => target => {
  let nameIn, nameOut
  ({nameIn, nameOut} = cfg)
  onmessage(e => target.dispatchEvent(new CustomEvent(nameIn, {detail: e.data})))
  target.addEventListener(nameOut, e => postMessage(e.detail))
}