/*
 * For dev-purposes only.
 */
document.addEventListener("DOMContentLoaded", function(event) {
//reload()
//localStorage.clear()
//setTimeout(function() {
  //styleToSheet.showStyles()
//}, 277);
}); ////////////////////////////////////////////////////////////
function showProps(props) {
for(var i in props) dev(i); dev(props[i])
console.debug(props)
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
