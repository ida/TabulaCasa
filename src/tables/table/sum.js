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


  var key = getKey()
  var rows = getRows(key)

  var cellValue = null
  var newCell = null
  var newCells = []
 
  var cellValueNew = 0
  var nothingChangedSymbol = '-'

  // Add sum-column at first pos doesn't make sense, omit that:
  if(colPos > 0) {

    for(var i=0; i < rows.length; i++) {
      var row = rows[i]
      var cells = row.split(cellDeli)
      var cellValue = cells[colPos-1]

      // Cell-value is *not* a number or float (ignore thousands-deli-commas):
      if(isNaN(cellValue.split(',').join('')) === false) {
        cellValueNew += Number(cellValue.split(',').join(''))
        newCells.push(cellValueNew)
      }
      // Cell-value is a number or float:
      else {
        newCells.push(nothingChangedSymbol)
      }
    }
    addColumn(key, colPos, newCells)

    // Add class to first sum-col-cell,
    // replaces col-nr with 'SUM' via CSS-rule:
    var tableEle = document.getElementById(key)
    var rowEle = tableEle.firstChild
    rowEle.children[colPos].classList.add('sum')

  } // colPos > 0
}  //  addSumColumn

