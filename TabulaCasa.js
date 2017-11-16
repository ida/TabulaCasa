function TabulaCasa(appEle) {
var appName = 'TabulaCasa'
function addStylesheet() {
  // Add style-ele:
  var styleEle = addEle(document.getElementsByTagName('head')[0], '', 'style')
  styleEle.className = appName + 'Styles'

  // Add style for app-ele:
  var selector = '.' + appName
  var style = 'background: lightblue;'
  addStyle(selector, style)

  genStyleTable('.' + appName)
}
/*
 *
 * General helper-func
 *
 */
function addEle(parentEle, html=null, tagName='div') {
  var ele = document.createElement(tagName)
  if(html) { ele.innerHTML = html }
  parentEle.appendChild(ele)
  return ele
}
/*
 *
 * Getter-conventions
 *
 */
function getAppEle() {
  // App-ele is assumed to carry the glob-var appName as
  // className and is the only ele with this class in the
  // doc.
  return document.getElementsByClassName(appName)[0]
}
function getComponentEle(appEle, componentName) {
  // A component-ele is assumed to live within the app-ele
  // and is the only ele within the app-ele with the
  // componentName as className.
  return appEle.getElementsByClassName(componentName)[0]
}
/*
 *
 *  Styling
 *
 */
function addStyle(newSelector, newStyle) {
  // Example:
  // addStyle('div > h1', 'background: red; color: green;')
  var ruleChanged = false
  var rules = getRules(getStyles())
  for(var i in rules) {
    var rule = rules[i]
    var selector = rule.split('{')[0].trim()
    var style = rule.split('{')[1].trim()
    var props = getProps(style)
    var newProps = getProps(newStyle)
    // selector exists already:
    if(selector == newSelector) {
      for(var key in newProps) {
        // prop exists already:
        if(props[key] !== undefined) {
          // old val differs new val:
          if(props[key] != newProps[key]) {
            // set new val:
            props[key] = newProps[key]
            ruleChanged = true
          }
        } // prop does not exist already:
        else { 
          // set prop and val:
          props[key] = newProps[key]
          ruleChanged = true
        }
      } // each newProp
    } // selector exists
    if(ruleChanged) { // set changed rule in rules:
      style = ''
      for(var key in props) {
        style += key + ': ' + props[key] + ';\n'
      }
      rules[i] = selector + '{\n' + style
      break
    }
  } // each rule
  if(ruleChanged) { // rule exists and changed, set new styles:
      setStyles(rules)
  }
  else { // rule doesn't exist, append to styles:
    getStyleEle().innerHTML += newSelector + ' {\n' + newStyle + '}\n'
  }
}
function addStyles(string) {
  getStyleEle().innerHTML += string
}
function getProps(style) {
  style = style.split(';')
  style.pop() // last item is an empty str, remove it
  props = {}
  for(var i in style) {
    var styl = style[i].trim()
    var propValPair = styl.split(':')
    var prop = propValPair[0].trim()
    var val = propValPair[1].trim()
    props[prop] = val
  }
  return props
}
function getRules(style) {
  // Return rules of stylesheet as a list.
  var rules = style.split('}')
  rules.pop() // last item is an empty str, remove it
  return rules
}
function getStyle(selector) {
  var style = null
  var styles = getStyles()
  var rules = getRules(styles)
  for(var i in rules) {
    var rule = rules[i].trim()
    var selectors = rule.split('{')[0].split(',')
    for(var j in selectors) {
      if(selectors[j].trim() == selector) {
        style = rule.split('{')[1]
      }
    }
  }
  return style
}
function getStyleEle() {
  // The styleEle is assumed to be the only ele within the head-ele
  // which carries the appName plus 'Styles' as className.
  var ele = document.getElementsByTagName('head')[0]
  ele = ele.getElementsByClassName(appName + 'Styles')[0]
  if(ele) return ele
}
function getStyles() {
  var ele = getStyleEle()
  return ele.innerHTML
}
function setStyles(rules) {
  var styles = ''
  for(var i in rules) {
    var rule = rules[i]
    styles += rule + '\n}'
  }
  getStyleEle().innerHTML = styles
}
var appName = 'tabulaCasa'
var cellDeli = ','
var rowDeli = '\n'

function main(appEle=null) {

  addStylesheet()

  if(appEle===null) appEle = document.body
  else appEle = appEle
  appEle.className = appName

  var controlsEle = addEle(appEle)
  controlsEle.className = 'controls'
  addControls(controlsEle)

  var tablesEle = addEle(appEle)
  tablesEle.className = 'tables'

  showTable(getKey())
}
/*
 * For dev-purposes only.
 */
document.addEventListener("DOMContentLoaded", function(event) {
//reload()
//localStorage.clear()
//showStyles()
}); ////////////////////////////////////////////////////////////
function showProps(props) {
for(var i in props) dev(i); dev(props[i])
console.debug(props)
}
function showStyles(styleEle) {
  var styles = getStyles().split('\n')
  for(var i in styles) dev(styles[i])
}
function reload(ms=2727) {
  setInterval(function() {
    window.location.href = window.location.href
  }, ms);
}
function dev(html='') {
  var devEleId = 'dev'
  var devEle = document.getElementById(devEleId) 
  if(devEle == null) {
    var parentEle = document.body
    devEle = document.createElement('div')
    devEle.id = devEleId
    parentEle.insertBefore(devEle, parentEle.firstChild)
  }
  html += '<br>'
  devEle.innerHTML += html
}
var csv = 'Ida' + cellDeli + 'Ebkes' + cellDeli + '42' + rowDeli
        + 'Bob' + cellDeli + 'Stewa' + cellDeli + '33'
function addControls(controlsEle) {
  addSelectTableEle(controlsEle)
  addModifyTablesEle(controlsEle)
  addControlsListeners(controlsEle)
}
function addControlsListeners(controlsEle) {
  listenControlsAction(controlsEle
    .getElementsByClassName('actions')[0])
  listenTablesSelection(controlsEle
    .getElementsByClassName('tablesSelection')[0])
}
function addModifyTablesEle(controlsEle) {
  // Add actionEle (add/del/move row/column, etc.):
  var html = genControlsActionHtml()
  var controlEle = addEle(controlsEle, html, 'span')
  controlEle.className = 'actions'

  // Insert 'Upload'-wrapper:
  controlEle = addEle(controlsEle, '', 'span')
  controlEle.style = 'position: relative; top: 0; left: 0; display: none;'
  // Insert 'Upload'-button:
  addEle(controlEle, 'Upload', 'span')
  // Insert 'Browse'-button:
  controlEle = provideFileUpload(controlEle, doAfterFileUpload)
  // Hide 'Browse', leave 'Upload' visible:
  controlEle.style = '\
    position: absolute;\
    top: 0;\
    left: 0;\
    height: 1.5em;\
    width: 5em;\
    margin: 0;\
    padding: 0;\
    font-size: 20px;\
    cursor: pointer;\
    opacity: 0;\
    filter: alpha(opacity=0);'
}
function doAfterFileUpload(csv) {
  addTable(getKey(), csv)
}
function genControlsActionHtml() {
  //var html = 'Actions: <select class="action">' +
  var html = '<select class="action">' +
    '<option>add</option>' +
    '<option>del</option>' +
    '<option>move</option>' +
    '<option>import</option>' +
  '</select>' +
  '<select class="what">' +
    '<option>Row</option>' +
    '<option>Column</option>' +
    '<option>Table</option>' +
  '</select>' +
  '<input class="positions" value="1">' +
  '<span class="targetPosition" style="display: none;"> to position ' +
  '<input value="2">' +
  '</span>'
  return html
}
function listenControlsAction(controlsEle) {
  var actionEle = controlsEle.getElementsByClassName('action')[0]
  var importEle = controlsEle.parentNode.children[controlsEle.parentNode.children.length-1]
  var positionsEle = controlsEle.getElementsByClassName('positions')[0]
  var whatEle = controlsEle.getElementsByClassName('what')[0]
  var tableKey = null
  var targetPositionEle = controlsEle.getElementsByClassName('targetPosition')[0]
  actionEle.onkeyup = function(eve) {
    var options = whatEle.getElementsByTagName('option')
    if(eve.target.value == 'move') {
      targetPositionEle.style.display = 'inline'
      for(var i=0; i < options.length; i++) {
        if(options[i].value == 'Table') {
          options[i].remove()
        }
      }
    }
    else if(eve.target.value == 'import') {
      importEle.style.display = 'inline'
    }
    else {
      targetPositionEle.style.display = 'none'
      var hasOptionTable = false
      for(var i=0; i < options.length; i++) {
        if(options[i].value == 'Table') {
          hasOptionTable = true
        }
      }
      if(! hasOptionTable) {
        var optionEle = document.createElement('option')
        optionEle.innerHTML = 'Table'
        whatEle.appendChild(optionEle)
      }
    }
  }
  controlsEle.onkeyup = function(eve) {
    if(eve.keyCode == 13) {
      var args = [getKey()]
      var action = actionEle.value
      var what = whatEle.value
      var positions = positionsEle.value
      var funcName = action + what // Can be 'addRow', 'delColumn', etc.
      // Collect args:
      if(what == 'Table') {
        args = [positions]
      }
      else {
        if(action == 'move') {
          var targetPosition = targetPositionEle.getElementsByTagName('input')[0].value
          args.push(targetPosition)
        }
        else {
          args.push(positions)
        }
      }
      // Catch exceptions:
      if( ! (what == 'Table' && ( action == 'add' && keyExists(positions) )
                             || ( action == 'delete' && ! keyExists(positions) )
            )
        ) {
        // Exe choosen func:
        //window[funcName].apply(null, args)
        // The above line does not work after wrappping app into a glob-func.
        // Instead, we need to exe funcs explicitly:
        if(funcName == 'addRow')          addRow.apply(null, args)
        else if(funcName == 'addColumn')  addColumn.apply(null, args)
        else if(funcName == 'addTable')   addTable.apply(null, args)
        else if(funcName == 'delRow')     delRow.apply(null, args)
        else if(funcName == 'delColumn')  delColumn.apply(null, args)
        else if(funcName == 'delTable')   delTable.apply(null, args)
        else if(funcName == 'moveRow')    moveRow.apply(null, args)
        else if(funcName == 'moveColumn') moveColumn.apply(null, args)
        else console.warn('There is no function named "' + funcName + '" available.')
      }
    } // is enter-key
  } // a key is pressed
} // listenControlsAction
function addSelectTableEle(controlsEle) {
  var html = genTablesSelectionHtml()
  var controlEle = addEle(controlsEle, html, 'span')
  controlEle.className = 'tablesSelection'
}
function genTablesSelectionHtml(key=null) {
  //var html = 'Table: <select>'
  var html = '<select>'
  var keys = getKeys()
  for(var i=0; i < keys.length; i++) {
    html += '<option'
    if( (key === null && i==0) || (key !== null && keys[i] == key) ) {
      html += ' selected'
    }
    html += '>' + keys[i] + '</option>'
  }
  html += '</select>'
  return html
}
function listenTablesSelection(tablesSelectionEle) {
  var tablesSelectEle = tablesSelectionEle.children[0]
  tablesSelectEle.onchange = function(eve) {
    for(var i=0; i < eve.target.children.length; i++) {
      if(eve.target.children[i].selected === true) {
        showTableOnly(eve.target.children[i].value)
      }
    }
  }
}
function updateTablesSelection(key) {
  var tablesSelectionEle = getComponentEle(getAppEle(), 'tablesSelection')
  tablesSelectionEle.innerHTML = genTablesSelectionHtml(key)
  listenTablesSelection(tablesSelectionEle)
}
function genStyleTable(prefix, showNrs=true) {
  var tableTagName = 'div'
  var rowTagName = 'ul'
  var cellTagName = 'li'

  var tableSelector = prefix + ' .tables > ' + tableTagName
  var rowSelector = tableSelector + ' > ' + rowTagName
  var cellSelector = rowSelector + ' > ' + cellTagName

  var background = '#000'
  var borderWidth = '0.1em'
  var border = borderWidth + ' solid'
  var color = '#fff'
  var cellWidth = '13em'
  var lineHeight = '1.75em'
  var padding = '0.25em'
/*
 *
 *  Prep styles:
 *
 */
  var cellBorder = `
  border-left: ` + border + `;
  border-top: ` + border + `;
`
  var cellWidthAndHeight = '\
  width: ' + cellWidth + ';\n\
  height: ' + lineHeight + ';\n\
'
  var cellInputStyle = `
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
`
  var cellStyleBase = cellInputStyle + 'margin: 0; padding: ' + padding + ';'
  var cellStyle = cellStyleBase + cellWidthAndHeight
  var cellOverflowStyle = `
  overflow: visible;
  background: inherit;
  width: auto;
  min-width: ` + cellWidth + ';'
/*
 *
 *  Set styles:
 *
 */
  var selector = tableSelector
  var style = `
  border-right: 1px solid;
  border-bottom: 1px solid;
  line-height: ` + lineHeight + ';'
  addStyle(selector, style)

  selector = rowSelector
  style = 'white-space: nowrap; margin: 0; padding: 0;'
  addStyle(selector, style)

  selector = cellSelector
  style = cellStyle + cellBorder
  addStyle(selector, style)

  selector = cellSelector + ':focus'
  style = cellOverflowStyle
  addStyle(selector, style)

  selector = cellSelector + ':hover'
  style = cellOverflowStyle
  addStyle(selector, style)

  selector = cellSelector + ' input'
  style = 'background: inherit;\n\
  border: none;\n\
  color: inherit;\n\
  font: inherit;\n\
  margin: 0;\n\
  padding: 0;\n'
  addStyle(selector, style)
/*
 *
 * NUMBERING
 *
 */
  if(showNrs) {
  var colFirstCellSelector = rowSelector + 
                             ':first-child > ' +
                             cellTagName

  var colNrParentStyle = `
  position: relative;
  top: 0;
  left: 0;
  overflow: visible;
`
  var colNrPosTop = parseFloat(lineHeight) +
                    2* parseFloat(padding) +
                    2* parseFloat(borderWidth) + 'em'
  var colNrPosLeft = parseFloat(borderWidth) + 'em'
  var colNrStyle = '\
  ' + cellStyle + '\
  ' + cellBorder + '\
  position: absolute;\n\
  top: -' + colNrPosTop + ';\n\
  left: -' + colNrPosLeft + ';\n\
  '

  var rowNrStyle = '\
  ' + cellStyleBase + '\
  ' + cellBorder + '\
  text-align: right;\n\
  min-width: 1.75em;\n\
  ' // rowNrStyle

  style = '\
' + tableSelector + ' {\n\
  counter-reset: rowscounter;\n\
}\n\
/* TABLE-ID: */\n\
' + tableSelector + ':before {\n\
  content: attr(id);\n\
  ' + rowNrStyle + '\
}\n\
' + rowSelector + ':before {\n\
  counter-increment: rowscounter;\n\
  content: counter(rowscounter);\n\
  counter-reset: columnscounter;\n\
  ' + rowNrStyle + '\
}\n\
/* COL-NRS: */\n\
' + tableSelector + ' > *:first-child > * {\n\
  ' + colNrParentStyle + '\
}\n\
' + colFirstCellSelector + ':before {\n\
  counter-increment: columnscounter;\n\
  content: counter(columnscounter);\n\
  ' + colNrStyle + '\
}\n\
' // style
  addStyles(style)
  } // showNrs
}
// This file contains all functions for modifying the localStorage and
// display the data as a table-like list after any modification.


function addCell(key, rowPos, cellPos, cellContent='', displayTable=false) {
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
function addColumn(key, colPos, displayTable=true) {
  colPos -= 1
  var csv = ''
  var rows = getRows(key)
  // No rows there, yet:
  if(rows == '') {
    // Represent first cell with a space,
    // otherwise would interpreted as empty table:
    rows = [' ']
  }
  // Some rows exist already: 
  else {
    for(var i=0;  i < rows.length; i++) {
      var row = rows[i].split(cellDeli)
      row.splice(colPos, 0, '') // insert empty str at pos
      rows[i] = row.join(cellDeli)
    }
  }
  csv = rows.join(rowDeli)
  addTable(key, csv, displayTable)
}
function addRow(key, rowPos, vals='') {
  rowPos -= 1
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
  colPos -= 1
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
  rows.splice(rowPos-1, 1) // at rowPos-1 remove 1 item
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
  rowPos -= 1
  targetPos -=1
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
  rowPos -= 1
  targetPos -=1
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
  var tablesEle = getComponentEle(getAppEle(), 'tables')
  var tableEle = document.getElementById(key)
  if(tableEle === null || tableEle === undefined) {
    tableEle = addEle(tablesEle)
    tableEle.id = key
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
function cursorIsAtBeginning(input) {
  if(input.selectionStart == 0
    && input.selectionEnd == 0) {
    return true
  }
  else {
    return false
  }
}
function cursorIsAtEnd(input) {
  if(input.selectionStart == input.value.length
    && input.selectionEnd == input.value.length) {
    return true
  }
  else {
    return false
  }
}
function moveCursorToEnd(input) {
  input.selectionStart = input.value.length
  input.selectionEnd = input.value.length
}
function handleArrowKey(eve) {
  var input = eve.target
  var keyCode = eve.keyCode
  // Left-arrow:
  if(keyCode == '37' && cursorIsAtBeginning(input)
                     && input.parentNode.previousSibling != null) {
    eve.preventDefault() // surpress arrow-move before setting new focus
    input.parentNode.previousSibling.focus()
    moveCursorToEnd(document.activeElement)
  }
  // Right-arrow:
  else if(keyCode == '39' && cursorIsAtEnd(input)
                          && input.parentNode.nextSibling != null) {
    eve.preventDefault() // surpress arrow-move before setting new focus
    input.parentNode.nextSibling.focus()
  }
  else {
    var cellPos = getCellPos(input.parentNode)
    var rows = input.parentNode.parentNode.parentNode.getElementsByTagName('ul')
    var rowPos = getRowPos(input.parentNode)
    // Down-arrow:
    if(keyCode == '40' && rowPos != rows.length-1) {
      input.parentNode.parentNode.nextSibling.children[cellPos].focus()
    }
    // Up-arrow: 
    else if(keyCode == '38' && rowPos != 0) {
      input.parentNode.parentNode.previousSibling.children[cellPos].focus()
    }
  }
}
//
// UPLOAD
// ======
//
// What
// ----
// Let a user select a file from their filesystem, immediately upload
// it, and do something with its content.
//
// Why
// ---
// Provide a possibility to upload a file's content into a serverless
// browser-app. For example to read csv-files and display them in a
// table-like manner as html-lists.
//
// Usage
// -----
// function doSthAfterUpload (content) { console.debug(content) }
// var inputContainer = document.body
// provideFileUpload(inputContainer, doSthAfterUpload)
//
// Docs
// ----
// https://developer.mozilla.org/en-US/docs/Web/API/File
//
function addFilesInputEle(inputContainer) {
  var input = document.createElement('input')      // create input
  input.type = 'file'                      // make it a file-input
  input.setAttribute('multiple', 'true')  // enable multiple files
  inputContainer.appendChild(input)         // insert input in DOM
  return input
}
function provideInputEle(inputContainer, reader) {
  var input = addFilesInputEle(inputContainer)        // add input
  input.onchange = function(eve) {      //  when user selects file
    var file = eve.target.files[0]                  //    get file
    reader.readAsText(file, 'ascii')               //    load file
  }
  return input
}
function provideFileReader(doAfterFileUpload) {
  var content = null
  var reader = new FileReader()           //   provide file-reader
  reader.onloadend = function(eve) {     // when a file has loaded
    content = eve.target.result         // fetch content
    // Remove last empty line that has been appended after upload:
    content = content.slice(0, content.length-1)
    doAfterFileUpload(content)       // pass content to callback
  }
  return reader
}
function provideFileUpload(inputContainer, doAfterFileUpload) {
  var reader  = provideFileReader(doAfterFileUpload)
  var input = provideInputEle(inputContainer, reader)
  return input
}
//
// DOWNLOAD
//
// Example:
//  var containerEle = document.body
//  var downloadContent = document.body.innerHTML
//  provideFileExport(containerEle, downloadContent)
//
function provideFileExport(containerEle, downloadContent) {
  var exportButton = document.createElement('a')
  exportButton.id = 'download'
  exportButton.textContent = 'Download'
  exportButton.setAttribute('download', 'tesa.csv')
  updateDownloadButton(exportButton, downloadContent)
  containerEle.appendChild(exportButton)
}
function updateDownloadButton(button, downloadContent) {
  button.href = 'data:application/csv;charset=utf-8,'
              + encodeURIComponent(downloadContent)
}
function getCellPos(cellEle) {
  return getChildPos(cellEle)
}
function getChildPos(ele) {
  var pos = 0
  while(ele.previousSibling !== null) {
    if(ele.previousSibling === null ||
       ele.previousSibling.tagName.toLowerCase() == 'div') {
      break
    }
    ele = ele.previousSibling
    pos += 1
  }
  return pos
}
function getRowPos(cellEle) {
  return getChildPos(cellEle.parentNode)
}
function insertInput(cell) {
  cell.innerHTML = '<input value="' + cell.innerHTML + '">'
  var input = cell.getElementsByTagName('input')[0]
  input.focus()
  listenInput(input)
}
function listenInput(input) {
  // Input looses focus, reset cell-html with val:
  input.onblur = function(eve) {
    input.parentNode.innerHTML = input.value
  }
}
function listenCells(tableEle) {
  // We assume every list-item within a table is a cell:
  var cells = tableEle.getElementsByTagName('li')
  for(var i=0; i < cells.length; i++) {
    // When user clicks into a cell:
    cells[i].onclick = function(eve) {
      insertInput(eve.target)
    }
    // When user types something into input:
    cells[i].onkeydown = function(eve) {
      // In case it's an arrow-key:
      if(eve.keyCode == '37'
      || eve.keyCode == '38'
      || eve.keyCode == '39'
      || eve.keyCode == '40') {
        handleArrowKey(eve)
      }
    }
    // When user has typed something into input:
    cells[i].onkeyup = function(eve) {
      // Write the new val into localStorage,
      // for that we need table-key, row-pos and cell-pos:
      var cellPos = getCellPos(eve.target.parentNode)
      var rowPos = getRowPos(eve.target.parentNode)
      var key = getKey()
      addCell(key, rowPos, cellPos, eve.target.value)
    }
    // When a cell gains focus:
    cells[i].onfocus = function(eve) {
      // Simulate click in it:
      eve.target.click()
    }
  }
}
  main(appEle)
} // End of TabulaCasa()
