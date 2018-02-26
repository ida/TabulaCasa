/*
 * For dev-purposes only.
 */
document.addEventListener("DOMContentLoaded", function(event) { reload(
14000
)

dev('branch: sortdate')

var csv = '23.01.1977' + cellDeli + 'Ebkes' + cellDeli + '1' + rowDeli
        + '28.05.1937' + cellDeli + 'Chera' + cellDeli + '2' + rowDeli
        + '02/25/2018' + cellDeli + 'Linde' + cellDeli + '6i' + rowDeli
        + '21.09.2011' + cellDeli + 'Stewa' + cellDeli + '3'

setTimeout(function(){

  addTable(1, csv)

  sortColumnByDate(columnPos=0)





  /*
  delTable(1)
  var what = document.getElementsByClassName('what')[0]
  what.focus()
  what = what.children[what.children.length-1]
  what.selected=true
  */
}, 277);
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
  if(devEle == null) { // create devEle, if it doesn't exist already
    var parentEle = document.body
    devEle = document.createElement('div')
    devEle.id = devEleId
    parentEle.insertBefore(devEle, parentEle.firstChild)
  }
  html += '<br>' // append passed html to devEle, prepend with a linebreak
  devEle.innerHTML += html
} // Some sample csv for testing:
var csv = 'Ida' + cellDeli + 'Ebkes' + cellDeli + '42' + rowDeli
        + 'Udo' + cellDeli + 'Linde' + cellDeli + '6i' + rowDeli
        + 'Ame' + cellDeli + 'Chera' + cellDeli + '14' + rowDeli
        + 'Bob' + cellDeli + 'Stewa' + cellDeli + '33'
