/*
 * For dev-purposes only.
 */
document.addEventListener("DOMContentLoaded", function(event) { reload(
99914000
)
setTimeout(function(){
delTable(1)
addTable(1, csv)
var what = document.getElementsByClassName('what')[0]
what.focus()
what = what.children[what.children.length-1]
what.selected=true
}, 277);
//dev('branch: summ')
// select and choose sumcolumn:
/*
addSumColumn()

*/
//localStorage.clear()
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
        + 'Udo' + cellDeli + 'Linde' + cellDeli + '6i7' + rowDeli
        + 'Ame' + cellDeli + 'Chera' + cellDeli + '14' + rowDeli
        + 'Bob' + cellDeli + 'Stewa' + cellDeli + '33'
