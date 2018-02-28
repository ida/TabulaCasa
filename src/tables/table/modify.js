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
      cells = rows[i].split(cellDeli)
      // Cell-values have been pased, get cell-value:
      if(colCells !== null && i <= colCells.length) cell = colCells[i]
      cells.splice(colPos, 0, cell) // insert cell at pos
      rows[i] = cells.join(cellDeli)
    }
  }
  csv = rows.join(rowDeli)
  addTable(key, csv, displayTable)
}
function addRow(key, rowPos, vals='') {
  var csv = null
  var rows = getRows(key)
  // No rows there, yet:
  if(rows == '') {
    rows = [' '] // ugly workaround to not be interpreted as empty table
  }
  // Some rows exist already: 
  else {
    vals = vals.split(cellDeli)
    while(vals.length < rows[0].split(cellDeli).length) {
      vals.push('')
    }
    vals = vals.join(cellDeli)
    if(rowPos > rows.length) {
    // TODO: fill up with empty rows
    }
    rows.splice(rowPos, 0, vals)
  }
  csv = rows.join(rowDeli)
  addTable(key, csv)
}
function addTable(key, csv='', displayTable=true) {
  localStorage.setItem(key, csv)
  if(displayTable==true) {
    showTableOnly(key)
    updateTablesSelection(key)
  }
}
function delColumn(key, colPos) {
  var csv = ''
  var rows = getRows(key)
  // Is not last col (remove last col = empty str for csv):
  if(rows[0].split(cellDeli).length > 1) {
    for(var i=0;  i < rows.length; i++) {
      var row = rows[i].split(cellDeli)
      row.splice(colPos, 1) // remove item at pos
      rows[i] = row.join(cellDeli)
    }
    csv = rows.join(rowDeli)
  }
  addTable(key, csv)
}
function delRow(key, rowPos) {
  var rows = getRows(key)
  rows.splice(rowPos, 1) // at rowPos remove 1 item
  var csv = rows.join(rowDeli)
  addTable(key, csv, true)
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
              // select second table-button:
              buttons[1].selected = true
            }
          }
        } // is selected button
        button.remove()
      } // is button with key
    } // for each button
  } // key exists
}
function getCell(rowPos, colPos) {
  var rows = getRows(getKey())
  return getCellOfRows(rows, rowPos, colPos)
}
function getCellOfRows(rows, rowPos, colPos) {
  return cell = rows[rowPos].split(cellDeli)[colPos]
}
function getKey() {
  var key = null
  var selectionEle = getComponentEle(getAppEle(), 'tablesSelection')
  var options = selectionEle.getElementsByTagName('option')
  for(var i=0; i < options.length; i++) {
    if(options[i].selected === true) {
      key = options[i].value
    }
  }
  return key
}
function getKeys() {
  var keys = []
  for(var i=0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i))
  }
  return keys
}
function getRows(key) {
  var rows = getTable(key)
  rows = rows.split(rowDeli)
  return rows
}
function getTable(key) {
  return localStorage.getItem(key)
}
function moveColumn(key, rowPos, targetPos) {
  var rows = getRows(key)
  for(var i=0; i < rows.length; i++) {
    var row = rows[i].split(cellDeli)
    moveItem(row, rowPos, targetPos)
    rows[i] = row.join(cellDeli)
  }
  var csv = rows.join(rowDeli)
  addTable(key, csv)
}
function moveItem(array, itemPos, targetPos) {
  var item = array.splice(itemPos, 1) // at itemPos remove 1 item
  array.splice(targetPos, 0, item) // at targetPos add item
  return array
}
function moveRow(key, rowPos, targetPos) {
  var rows = getRows(key)
  for(var i=0; i < rows.length; i++) {
  }
  // At rowPos remove 1 item and return it:
  var row = rows.splice(rowPos, 1)
  // At targetPos add item:
  rows.splice(targetPos, 0, row)
  var csv = rows.join(rowDeli)
  addTable(key, csv)
}
function keyExists(key) {
  keys = getKeys()
  for(var i=0; i < keys.length; i++) {
    if(keys[i] == key) {
      return true
    }
  }
  return false
}
function setCell(key, rowPos, cellPos, cellContent='', displayTable=false) {
// Overwrite existing cell or add new cell.
// Add empty rows and cells, if necessary.
  // Get rows:
  var rows = getRows(key)
  // Fill up empty rows:
  while(rowPos > rows.length-1) {
    rows.push( (cellDeli).repeat(rows[0].split(cellDeli).length) )
  }
  // For each row:
  for(var i=0;  i < rows.length; i++) {
    var row = rows[i]
    // Get its cells:
    var cells = row.split(cellDeli)
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
    rows[i] = cells.join(cellDeli)
  }  // EO for each row.
  // Set new rows:
  var csv = rows.join(rowDeli)
  addTable(key, csv, displayTable)
}

