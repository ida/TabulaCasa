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

