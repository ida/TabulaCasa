function genTableHtml(key) {
// Each row is an unordered list, containing cells as list-items.
  var html = '' // table-html 
  if(key === null) {
    html = 'There are no tables to display, yet.'
  }
  else if(localStorage.getItem(key) === null) {
    html = 'A table with the id "' + key + '" doesn\'t exist.'
  }
  else {
    var rows = getRows(key)
    if(rows != '') {
      for(var i=0; i < rows.length; i++) {
        html += '<ul>'
        cells = rows[i].split(cellDeli)
        for(var j=0; j < cells.length; j++) {
          html += '<li tabindex="0">' + cells[j] + '</li>'
        }
        html += '</ul>'
      }
    }
    else {
      html += 'The table has no content, yet.'
    }
  }
  return html
}
function showVisualRow(tableId, rowPos, rowContent=null) {
  // A visual row's content is not stored and not regarded
  // to be part of the table.
  // `rowContent` is expected to be an array, if it's null,
  // empty cells are inserted.
  var tableEle = document.getElementById(tableId)
  var rowEles = tableEle.children
  var rowEle = rowEles[rowPos]
  var newRowEle = document.createElement('ul')

  newRowEle.className = 'sum'

  if(rowContent === null) {
    rowContent = []
    for(var i=0; i < rowEles[0].children.length; i++) {
      rowContent.push('')
    }
  }

  for(var i=0; i < rowEles[0].children.length; i++) {
    var newCellEle = document.createElement('li')
    newCellEle.innerHTML = rowContent[i]
    newRowEle.appendChild(newCellEle)
  }

  if(rowEle === undefined) {
    tableEle.appendChild(newRowEle)
  }
  else {
    tableEle.insertBefore(newRowEle, rowEle)
  }
}
function showTable(key) {
  var tablesEle = getComponentEle(getAppEle(), 'tables')
  var tableEle = document.getElementById(key)
  if(tableEle === null || tableEle === undefined) {
    tableEle = addEle(tablesEle)
    table.ele = tableEle
    if(key !== null) tableEle.id = key
  }
  tableEle.innerHTML = genTableHtml(key)
  tableEle.style.display = 'inline-block'
  listenCells(tableEle)
}
function showTableOnly(key) {
  var tables = getComponentEle(getAppEle(), 'tables').children
  for(var i=0; i < tables.length; i++) {
    tables[i].style.display = 'none'
  }
  showTable(key)
}
function showTables(keys=null) {
  if(keys === null) { keys = getTableIds() }
  for(var i=0; i < keys.length; i++) {
    showTable(keys[i])
  }
}
