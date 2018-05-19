function addSumColumn(colPos) {
// At colPos insert column, each cell showing the sum of
// the previous cell and its upper sibling, where the sum
// is accumulated with each addition. Non-number-values
// in a cell are ignored. A number can be a whole number
// or a float, and commas for visualizing thousands are
// accepted, e.g. a million can look like this:
//
//   1,000,000.00
//


  var key = getTableId()
  var rows = getRows(key)

  var cellValue = null
  var newCells = []
 
  var accumulatedSum = 0
  var nothingChangedSymbol = '-'

  for(var i=0; i < rows.length; i++) {
    cellValue = rows[i].split(cellDeli)[colPos-1]

    // Cell-value is a number or float (ignore thousands-deli-commas):
    if(isNaN(cellValue.split(',').join('')) === false) {
      accumulatedSum += Number(cellValue.split(',').join(''))
      newCells.push(accumulatedSum)
    }
    // Cell-value is *not* a number or float:
    else {
      newCells.push(nothingChangedSymbol)
    }
  }

  // Replace first cell with 'SUM':
  newCells.splice(0, 1, '<b style="margin-left: 37%">SUM</b>')

  addColumn(key, colPos, newCells)


} // addSumColumn

function isNr(value) {
  // Regard `Number` returns zero for empty strings.
  return value != '' && isNaN(Number(value)) === false
}

function valueToNumber(value) {
  // If value is not a number, return zero.
  // Strip commas, considered to be thousands-separator.
  value = value.split(',').join('')
  value = Number(value)
  if(isNaN(value) === true) value = 0
  return value
}
function addSumRow(rowPos) {
// Look for nrs in cells of same pos in other rows,
// accumulate them and append a row with the sums.
// CSV: '1,2,3;4,5,6' ---> '1,2,3;4,5,6;5,7,9'
  var cell = null
  var cells = null
  var newCell = null
  var newCells = []
  var rows = getRows(getTableId())
  if(isNaN(rowPos) === true || rowPos < 1) rowPos = rows.length
  for(var i=0; i < rowPos; i++) {
    cells = rows[i].split(cellDeli)
    for(var j=0; j < cells.length; j++) {
      cell = cells[j]
      cell = valueToNumber(cell)
      if(i == 0) newCells[j] = 0
      newCell = newCells[j]
      newCells[j] = newCell + cell
    }
  }
  newCells = newCells.join(cellDeli)
  addRow(getTableId(), rowPos, newCells)
} // addSumRow

