// This file contains all functions for modifying the localStorage and
// display the data as a table-like list after any modification.


function addColumn(key, colPos, colCells=null, displayTable=true) {
  var csv   = null
  var cell  = null
  var cells = null
  var rows  = getRows(key)
  // No rows there, yet:
  if(rows == '') {
    // Represent first cell with a space,
    // otherwise would be interpreted as empty table:
    rows = [' ']
  }
  // Some rows exist already: 
  else {
    for(var i=0;  i < rows.length; i++) {
      cell = '' // default value
      cells = rows[i].split(cellSeparator)
      // Cell-values have been pased, get cell-value:
      if(colCells !== null && i <= colCells.length) cell = colCells[i]
      cells.splice(colPos, 0, cell) // insert cell at pos
      rows[i] = cells.join(cellSeparator)
    }
  }
  csv = rows.join(rowSeparator)
  setTable(key, csv, displayTable)
}
function addRow(key, rowPos, vals='', displayTable=true) {
  var csv = null
  var rows = getRows(key)
  // No rows there, yet:
  if(rows == '') {
    rows = [' '] // ugly workaround to not be interpreted as empty table
  }
  // Some rows exist already: 
  else {
    if(vals.indexOf(cellSeparator) != -1) vals = vals.split(cellSeparator)
    else vals = [vals]
    while(vals.length < rows[0].split(cellSeparator).length) {
      vals.push('')
    }
    vals = vals.join(cellSeparator)
    if(rowPos > rows.length) {
    // TODO: fill up with empty rows
    }
    rows.splice(rowPos, 0, vals)
  }
  csv = rows.join(rowSeparator)
  setTable(key, csv, displayTable)
}
function addTable(key, csv='', displayTable=true) {
  table = new Table(key, tablesEle)
  tables.push(table)
  setTable(key, csv, displayTable)
}
function cloneTable(sourceTableId, targetTableId) {
  var csv = localStorage.getItem(sourceTableId)
  addTable(targetTableId, csv)
}
function delColumn(key, colPos, displayTable=true) {
  var csv = ''
  var rows = getRows(key)
  // Is not last col (remove last col = empty str for csv):
  if(rows[0].split(cellSeparator).length > 1) {
    for(var i=0;  i < rows.length; i++) {
      var row = rows[i].split(cellSeparator)
      row.splice(colPos, 1) // remove item at pos
      rows[i] = row.join(cellSeparator)
    }
    csv = rows.join(rowSeparator)
  }
  setTable(key, csv, displayTable)
}
function delRow(key, rowPos, displayTable=true) {
  var rows = getRows(key)
  rows.splice(rowPos, 1) // at rowPos remove 1 item
  var csv = rows.join(rowSeparator)
  setTable(key, csv, displayTable)
}
function delTable(key) {
  if(keyExists(key)) {
    // Remove table of localStorage:
    localStorage.removeItem(key)
    // Remove table, if currently displayed and not hidden:
    if(document.getElementById(key) !== null) {
      document.getElementById(key).remove()
    }
    // Remove table-select-button of controls:
    var buttons = getComponentEle(getAppEle(), 'tablesSelection')
                 .getElementsByTagName('option')
    for(var i=0; i < buttons.length; i++) {
      var button = buttons[i]
      if(button.value == key) {
        // If it's the currently selected table,
        // switch selection to first other available table:
        if(button.selected === true) {
          // Selected table is not the first of tables:
          if(i != 0) {
            // Select first table-button:
            buttons[0].selected = true
          }
          // Selected table is the first of tables:
          else {
            // We have more than one table:
            if(buttons.length > 1) {
              // Select second table-button:
              buttons[1].selected = true
            }
          }
        } // is selected button
        button.remove()
      } // is button with key
    } // for each button
  } // key exists
}
function genEmptyRowArray(tableId) {
  var row = []
  var cellsAmount = getLastColumnPos(tableId)
  console.debug(cellsAmount)
  for(var i=0; i < cellsAmount; i++) {
    row.push('')
  }
  return row
}
function getCell(tableId, rowPos, colPos) {
  var rows = getRows(tableId)
  return getCellOfRows(rows, rowPos, colPos)
}
function getCellOfRows(rows, rowPos, colPos) {
  return cell = rows[rowPos].split(cellSeparator)[colPos]
}
function getLastColumnPos(tableId) {
  return getRows(tableId)[0].split(cellSeparator).length-1
}
function getLastRowPos(tableId) {
  return getRows(tableId).length-1
}
function getTableIds() {
  var keys = []
  for(var i=0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i))
  }
  return keys
}
function getRows(key) {
  var rows = getTable(key)
  rows = rows.split(rowSeparator)
  return rows
}
function getTable(key) {
  return localStorage.getItem(key)
}
function importTable(key, pos) {
  if(key != pos) addTable(pos)
}
function keyExists(key) {
  keys = getTableIds()
  for(var i=0; i < keys.length; i++) {
    if(keys[i] == key) {
      return true
    }
  }
  return false
}
function moveColumn(key, rowPos, targetPos, displayTable=true) {
  var rows = getRows(key)
  for(var i=0; i < rows.length; i++) {
    var row = rows[i].split(cellSeparator)
    moveItem(row, rowPos, targetPos)
    rows[i] = row.join(cellSeparator)
  }
  var csv = rows.join(rowSeparator)
  setTable(key, csv, displayTable)
}
function moveItem(array, itemPos, targetPos) {
  var item = array.splice(itemPos, 1) // at itemPos remove 1 item
  array.splice(targetPos, 0, item) // at targetPos add item
  return array
}
function moveRow(key, rowPos, targetPos, displayTable=true) {
  var rows = getRows(key)
  for(var i=0; i < rows.length; i++) {
  }
  // At rowPos remove 1 item and return it:
  var row = rows.splice(rowPos, 1)
  // At targetPos add item:
  rows.splice(targetPos, 0, row)
  var csv = rows.join(rowSeparator)
  setTable(key, csv, displayTable)
}
function setCell(key, rowPos, cellPos, cellContent='', displayTable=false) {
// Overwrite existing cell or add new cell.
// Add empty rows and cells, if necessary.
  rowPos = visualRowPosToDataRowPos(key, rowPos)
  // Get rows:
  var rows = getRows(key)
  // Fill up empty rows:
  while(rowPos > rows.length-1) {
    rows.push( (cellSeparator).repeat(rows[0].split(cellSeparator).length) )
  }
  // For each row:
  for(var i=0;  i < rows.length; i++) {
    var row = rows[i]
    // Get its cells:
    var cells = row.split(cellSeparator)
    // Fill up empty cells:
    while(cellPos >= cells.length) {
      cells.push('')
    }
    // It's the choosen row:
    if(i == rowPos) {
      // Add new cell-content:
      cells.splice(cellPos, 1, cellContent)
    }
    // Set new cells in row:
    rows[i] = cells.join(cellSeparator)
  }  // EO for each row.
  // Set new rows:
  var csv = rows.join(rowSeparator)
  setTable(key, csv, displayTable)
}
function tableIdExists(tableId) {
  var tableIds = getTableIds()
  for(var i=0; i < tableIdExists.length; i++) {
    if(tableId == tableIds[i]) return true
  }
  return false
}
function setTable(key, csv='', displayTable=false) {
  localStorage.setItem(key, csv)
  if(displayTable === true) {
    showTableOnly(key)
    updateTablesSelection(key)
  }
}
function visualRowPosToDataRowPos(tableId, rowPos) {
// The displayed table may contain non-data-rows
// (for now that is the case, if a row has 'sum' in the class-attr),
// subtract those of pos.
  var newRowPos = rowPos
  var tableEle = document.getElementById(tableId)
  var rowEles = tableEle.children
  for(var i=0; i < rowPos; i++) {
    var rowEle = rowEles[i]
    if(rowEle.className.indexOf('sum') > -1) {
      newRowPos -=1
    }
  }
  return newRowPos
}

