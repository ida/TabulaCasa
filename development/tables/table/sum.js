function addSumColumn(tableId, colPos) {
// At colPos insert column, each cell showing the sum of
// the previous cell and its upper sibling, where the sum
// is accumulated with each addition. Non-number-values
// in a cell are ignored. A number can be a whole number
// or a float, and commas for visualizing thousands are
// accepted, e.g. a million can look like this:
//
//   1,000,000.00
//


  var rows = getRows(tableId)

  var cellValue = null
  var newCells = []
 
  var accumulatedSum = 0
  var nothingChangedSymbol = '-'

  for(var i=0; i < rows.length; i++) {
    cellValue = rows[i].split(cellDeli)[colPos-1]

    if(isNumber(cellValue) === true) {
      accumulatedSum += valueToNumber(cellValue, '.', true)
      newCells.push(accumulatedSum)
    }
    else {
      newCells.push(nothingChangedSymbol)
    }
  }

  // Replace first cell with 'SUM':
  newCells.splice(0, 1, '<b style="margin-left: 37%">SUM</b>')

  addColumn(tableId, colPos, newCells)


} // addSumColumn


function addSumRow(tableId, rowPos, decimalSeparator='.') {
// Look for nrs in cells of same pos in other rows,
// accumulate them and append a row with the sums.
// CSV: '1,2,3;4,5,6' ---> '1,2,3;4,5,6;5,7,9'
  var cell = null
  var cells = null
  var newCell = null
  var newCells = []
  var rows = getRows(tableId)

  if( isNaN(rowPos) === true || rowPos < 1 ) rowPos = rows.length
  if(rowPos > rows.length) rowPos = rows.length

  for(var i=0; i < rowPos; i++) {
    cells = rows[i].split(cellDeli)
    for(var j=0; j < cells.length; j++) {
      cell = cells[j]
      cell = valueToNumber(cell, decimalSeparator, true)
      if(i == 0) newCells[j] = 0
      newCell = newCells[j]
      newCells[j] = newCell + cell
    }
  }

  rowPos = dataRowPosToVisualRowPos(rowPos)
  newCells = prettifyNumbers(newCells)
  showVisualRow(rowPos, newCells)

} // addSumRow


function addSumRowEveryNMonths(firstSumRowPos=null, months=1, dateColumnPos=0) {
// Accumulate sums until a new month starts, add sum-row,
// clear sum, repeat until end of table.
  var cells = null
  var month = 0
  var row = null
  var tableId = getTableId()
  var rows = getRows(getTableId())
  var value = null
  for(var i=0; i < rows.length; i++) {
    row = rows[i]
    cells = row.split(cellDeli)
    value = cells[dateColumnPos]
    number = dateToNumber(value)
    if(number.slice(4, 6) != month) {
      month = number.slice(4, 7)
      addSumRow(tableId, i, decimalSeparator)
    }
  }
}

