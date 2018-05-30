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
}
var csv = 'Ida' + cellDeli + 'Ebkes' + cellDeli + '42' + rowDeli
        + 'Udo' + cellDeli + 'Linde' + cellDeli + '6i' + rowDeli
        + 'Ame' + cellDeli + 'Chera' + cellDeli + '14' + rowDeli
        + 'Bob' + cellDeli + 'Stewa' + cellDeli + '33'
var csv = 'Ida' + cellDeli + 'Ebkes' + cellDeli + '42' + rowDeli
        + 'Udo' + cellDeli + 'Linde' + cellDeli + '6i' + rowDeli
        + 'Ame' + cellDeli + 'Chera' + cellDeli + '1,500.00' + rowDeli
        + 'Bob' + cellDeli + 'Stewa' + cellDeli + '33'
var csv = '23.01.1977' + cellDeli + 'Ebkes' + cellDeli + '1' + rowDeli
        + '28.05.1937' + cellDeli + 'Chera' + cellDeli + '2' + rowDeli
        + '02/25/2018' + cellDeli + 'Linde' + cellDeli + '6i' + rowDeli
        + '21.09.2011' + cellDeli + 'Stewa' + cellDeli + '3'
var csv = '23.01.2014' + cellDeli + 'Ebkes' + cellDeli + '1' + rowDeli
        + '28.05.2014' + cellDeli + 'Chera' + cellDeli + '2.3.727,27' + rowDeli
        + '02.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '21.09.2014' + cellDeli + 'Stewa' + cellDeli + '3'

/*
localStorage.clear(); addTable(27, csv)
var actionEle = document.getElementsByTagName('select')[1]
actionEle.selectedIndex = 3 // choose 'import'
actionEle.onchange(actionEle) // trigger change-event

var testRows = getRows(1)
var testCells = []
for(var i=0; i < testRows.length; i++) {
  var testRow = testRows[i]
  var testRowCells = testRow.split(cellDeli)
  for(var j=0; j < testRowCells.length; j++) {
    var testRowCell = testRowCells[j]
    console.debug(testRowCell, prettifyNumberString(testRowCell))
 
  }
}

reload()
addSumRowEveryNMonths(table.id)
addRow(table.id, 2, 'a'+cellDeli+'b'+cellDeli+'g')
*/



