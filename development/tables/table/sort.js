function sortColumnByDate(tableId, colPos) {
  // For each row compare cell of colPos with previous row's cell of colPos.
  // If previous cell is lesser than current cell, remember previous-pos and
  // continue with next previous row, until all rows are compared.
  // Then move row to new position, if it's lesser that previous cells.

  var rows = getRows(tableId)
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
        moveRow(tableId, rowPos, rowNewPos)
      }
    }
  }
}
