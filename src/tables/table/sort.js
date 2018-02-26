function dateToNumber(string) {
  // Expects 'DD.MM.YYYY' or 'MM/DD/YYYY', returns 'YYYYMMD'.
  if(string.indexOf('/') > -1) {
    string = string.slice(3, 5) + '.'
           + string.slice(0, 2) + '.'
           + string.slice(6, 10)
  }
  return string.split('.').reverse().join('')
}


function sortColumnByDate(colPos) {
  // For each row compare cell of colPos with previous row's cell of colPos.
  // If previous cell is lesser than current cell, remember previous-pos and
  // continue with next previous row, until all rows are compared.
  // Then move row to new position, if it's lesser that previous cells.

  var key = getKey()
  var rows = getRows(key)
  var cell, cellPrevious, rowNewPos, rowPreviousPos = null

  for(rowPos=0; rowPos < rows.length; rowPos++) {

    // Get current cell:
    cell = getCellOfRows(rows, rowPos, colPos)
    cell = dateToNumber(cell)

    // Omit comparison for first row:
    if(rowPos != 0) {

      rowNewPos = rowPos
      rowPreviousPos = rowPos - 1

      while( rowPreviousPos >= 0) {

        // Get previous cell:
        cellPrevious = getCellOfRows(rows, rowPreviousPos, colPos)
        cellPrevious = dateToNumber(cellPrevious)

        // Previous is lesser than this cell:
        if(cell <= cellPrevious) {
          // Remember pos of previous:
          rowNewPos = rowPreviousPos
        }
        // Go to next previous row:
        rowPreviousPos -=1
      }
      // Cell-value is lesser than previous cell-value(s):
      if(rowPos != rowNewPos) {
        // Move row to new pos:
        moveRow(key, rowPos, rowNewPos)
      }
    }
  }
}
