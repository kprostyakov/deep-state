const id = () => {
  //https://stackoverflow.com/a/49758101/9384391
  const ID_LENGTH = 36
  const START_LETTERS_ASCII = 97 // Use 64 for uppercase
  const ALPHABET_LENGTH = 26

  const uniqueID = () => [...new Array(ID_LENGTH)]
    .map(() => String.fromCharCode(START_LETTERS_ASCII + Math.random() * ALPHABET_LENGTH))
    .join('')

  return uniqueID
}

const attach = cfg => target => {
  target.addEventListener(cfg.event.in, e => {
    target.dispatchEvent(new CustomEvent(cfg.event.out, {detail: {id: id(), ...e.detail}}))
  })
}