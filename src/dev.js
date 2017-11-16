/*
 * For dev-purposes only.
 */
document.addEventListener("DOMContentLoaded", function(event) {
//reload()
//localStorage.clear()
//showStyles()
}); ////////////////////////////////////////////////////////////
function showProps(props) {
for(var i in props) dev(i); dev(props[i])
console.debug(props)
}
function showStyles(styleEle) {
  var styles = getStyles().split('\n')
  for(var i in styles) dev(styles[i])
}
function reload(ms=2727) {
  setInterval(function() {
    window.location.href = window.location.href
  }, ms);
}
function dev(html='') {
  var devEleId = 'dev'
  var devEle = document.getElementById(devEleId)
  if(devEle == null) {
    var parentEle = document.body
    devEle = document.createElement('div')
    devEle.id = devEleId
    parentEle.insertBefore(devEle, parentEle.firstChild)
  }
  html += '<br>'
  devEle.innerHTML += html
}
var csv = 'Ida' + cellDeli + 'Ebkes' + cellDeli + '42' + rowDeli
        + 'Bob' + cellDeli + 'Stewa' + cellDeli + '33'
