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
function showTable(key) {
console.log(key)
  var tablesEle = getComponentEle(getAppEle(), 'tables')
  var tableEle = document.getElementById(key)
  if(tableEle === null || tableEle === undefined) {
    tableEle = addEle(tablesEle)
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
  if(keys === null) { keys = getKeys() }
  for(var i=0; i < keys.length; i++) {
    showTable(keys[i])
  }
}
