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
      accumulatedSum += valueToNumber(cellValue, true) // true is for treating non-nrs as 0
      newCells.push(accumulatedSum)
    }
    else {
      newCells.push(nothingChangedSymbol)
    }
  }

  // Replace first cell with 'SUM':
  newCells.splice(0, 1, '<b style="margin-left: 37%">SUM</b>')

  addColumn(tableId, colPos, newCells)

}


function addSumRow(tableId, rowPos, startFromRowPos=0) {
// Look for nrs in cells of same pos in other rows,
// accumulate them and append a row with the sums.
// CSV: '1,2,3;4,5,6' ---> '1,2,3;4,5,6;5,7,9'
  var cell = null
  var cells = null
  var newCell = null
  var newCells = []
  var rows = getRows(tableId)
  var row = null

  if( isNaN(rowPos) === true || rowPos < 1 ) rowPos = rows.length
  if(rowPos > rows.length) rowPos = rows.length

  for(var i=startFromRowPos; i < rowPos; i++) {
    row = rows[i]
    cells = row.split(cellDeli)
    for(var j=0; j < cells.length; j++) {
      cell = cells[j]
      cell = valueToNumber(cell, true)
      if(i == startFromRowPos) newCells[j] = 0
      newCell = newCells[j]
      newCells[j] = newCell + cell
    }
  }

  rowPos = dataRowPosToVisualRowPos(rowPos)
  newCells = prettifyNumbers(newCells)
  showVisualRow(tableId, rowPos, newCells)

}


function addVisualRowEveryNDays(tableId, days=7, dateColumnPos=0) {
  var diffInDays = 0
  var rows = getRows(tableId)
  var row = rows[0]
  var cells = row.split(cellDeli)
  var date = cells[dateColumnPos]
  var startFromRowPos = 0
  for(var i=1; i < rows.length; i++) {
    row = rows[i]
    cells = row.split(cellDeli)
    var dateNew = cells[dateColumnPos]
    diffInDays += getDateDiffInDays(date, dateNew)
    if(diffInDays >= days) {
      diffInDays = 0
      showVisualRow(tableId, i, startFromRowPos)
      startFromRowPos = i
    }
    date = dateNew
  }
}


function addSumRowEveryNDays(tableId, days=7, dateColumnPos=0) {
// Accumulate sums until a new week starts, add sum-row,
// clear sum, repeat until end of table.
  var diffInDays = 0
  var rows = getRows(tableId)
  var row = rows[0]
  var cells = row.split(cellDeli)
  var date = cells[dateColumnPos]
  var startFromRowPos = 0
  for(var i=1; i < rows.length; i++) {
    row = rows[i]
    cells = row.split(cellDeli)
    var dateNew = cells[dateColumnPos]
    diffInDays += getDateDiffInDays(date, dateNew)
    if(diffInDays >= days) {
      diffInDays = 0
      addSumRow(tableId, i, startFromRowPos)
      startFromRowPos = i
    }
    date = dateNew
  }
  addSumRow(tableId, 0)
  addSumRow(tableId, i, startFromRowPos)
}


function addSumRowEveryNMonths(tableId, months=1, dateColumnPos=0) {
// Accumulate sums until a new month starts, add sum-row,
// clear sum, repeat until end of table.
  var rows = getRows(tableId)
  var row = rows[0]
  var cells = row.split(cellDeli)
  var date = dateToNumberString(cells[dateColumnPos])
  var month = date.slice(4, 6)
  var startFromRowPos = 0
  for(var i=1; i < rows.length; i++) {
    row = rows[i]
    cells = row.split(cellDeli)
    date = dateToNumberString(cells[dateColumnPos])
    if(date.slice(4, 6) != month) {
      month = date.slice(4, 6)
      addSumRow(tableId, i, startFromRowPos)
      startFromRowPos = i
    }
  }
  addSumRow(tableId, 0)
  addSumRow(tableId, i, startFromRowPos)
}


function getRowPosOfDateMetOrPassed(tableId, passDate, startRowPos=0, dateColumnPos=0) {

  var rows = getRows(tableId)
  for(var startRowPos=0; startRowPos < rows.length; startRowPos++) {
    var date = rows[startRowPos].split(cellDeli)[dateColumnPos]
    if(dateIsOlderThanOtherDate(passDate, date) === true) {
      return startRowPos
    }
    if(dateEqualsOtherDate(passDate, date) === true) {
      return startRowPos + 1
    }
  }
  return startRowPos
}


function getColumnSum(tableId, colPos, startRowPos=0, endRowPos=null) {
  var sum = 0
  var rows = getRows(tableId)
  if(endRowPos === null) endRowPos = rows.length-1
  for(var i=startRowPos; i < endRowPos+1; i++) {
    var cell = rows[i].split(cellDeli)[colPos]
    var nr = valueToNumber(cell)
    sum += nr
  }
  return sum
}


function addSumRowPerWeek(tableId, dateColumnPos=0, sumColumnPos=null) {

  if(sumColumnPos === null) sumColumnPos = getLastColumnPos(tableId)

  var rowPosStart = 0
  var rowPosEnd = rowPosStart-1 // must be one less than rowPos to start with
  var dateStart = getCell(tableId, rowPosStart, dateColumnPos)
  var dateEnd = addNDaysToDate(dateStart, 6)
  var sum = null
  var visualRowContent = null
  var visualRowPos = null
  var visualRowsAmount = 0

  function addVisualSumRow(dateEnd, rowPosStart) {
    sum = getColumnSum(tableId, sumColumnPos, rowPosStart, rowPosEnd)
    visualRowContent = genEmptyRowArray(tableId)
    visualRowContent[dateColumnPos] = dateEnd
    visualRowContent[sumColumnPos] = sum
    visualRowPos = rowPosEnd + visualRowsAmount + 1
    showVisualRow(tableId, visualRowPos, visualRowContent)
    visualRowsAmount += 1
  }

  function addVisualSumRowAfterAWeek() {
    rowPosStart = rowPosEnd + 1
    if(rowPosStart > 0) {
      dateStart = addNDaysToDate(dateEnd, 1)
      dateEnd = addNDaysToDate(dateStart, 6)
    }
    rowPosEnd = getRowPosOfDateMetOrPassed(tableId, dateEnd)
    rowPosEnd -= 1
    addVisualSumRow(dateEnd, rowPosStart, visualRowsAmount)
  }

  // As long as there are rows, add sum-row after every week:
  while(rowPosEnd < getLastRowPos(tableId)) {
    addVisualSumRowAfterAWeek()
  }
}

