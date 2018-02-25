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

  // Add class to last cell, so col-nr gets replaced with 'SUM' via CSS-rule:
  var tableEle = document.getElementById(key)
  var rowEle = tableEle.firstChild
  var lastCellEle = rowEle.children[rowEle.children.length-1]
  lastCellEle.classList.add('sum')
  lastCellEle.classList.add('summ')

}
function delSumColumn() {
// If a sum-column exists, remove it.
  var tableKey = getKey()
  var tableEle = document.getElementById(tableKey)
  var rowEle = tableEle.firstChild
  var colPos = rowEle.children.length-1
  var lastCellEle = rowEle.children[colPos]

  if(lastCellEle.className.indexOf('sum') != -1) { // is sum-col
    delColumn(tableKey, colPos)
  }

}

