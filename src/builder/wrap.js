const hostAPIWrap = definedAPI => `const msg = (function(){
  ${definedAPI}
  return {
    send,
    on
  }
})()`

module.exports = { hostAPIWrap }