function addSumColumn() {
// Append a column which shows the accumulated sum of nrs of the previous column.
// Get last cell of every row and accumulate nrs, generate new col of it.
  // Get current table-key:
  var key = getKey()
  var rows = getRows(key)

  var lastNewCell = null
  var newCell = null
  
  var cellValue = null
  var cellValueNew = 0
  var nothingChangedSymbol = '-'

  for(var i=0; i < rows.length; i++) {
    var row = rows[i]
    var cells = row.split(cellDeli)
    var cellValue = cells[cells.length-1]
    if(isNaN(cellValue) === false) { // is a nr
      cellValueNew += Number(cellValue)
      addCell(key, i, cells.length, cellValueNew)
    }
    else {
      addCell(key, i, cells.length, nothingChangedSymbol)
    }
  }
  showTableOnly(key)

  // Get lst col-nr, replace it with 'SUM'
var tableEle = document.getElementById(key)
var rowEle = tableEle.firstChild
var lastCellEle = rowEle.children[rowEle.children.length-1]
lastCellEle.classList.add('sum')

//var tableEle = tablesEle
}
