function TabulaCasa(appEle) {
var appName = 'TabulaCasa'
function addAppStyles() {
  var background = 'inherit'
  var color = 'inherit'

  var selector = ''
  var style = `
    background: ` + background  + `;
         color: ` + color       + `;
  `
  styleToSheet.addRule(selector, style)


  style += 'border: none;'
  selector = ' input'
  styleToSheet.addRule(selector, style)


  selector = ' select'
  // Remove browser-styled arrow-down of selection-dropdown:
  // Only for testing, not IE-compatible.
  style += `
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  `
  styleToSheet.addRule(selector, style)

}
var styleToSheet = {
/*


What
----

Dynamically style in Javascript during development,
then export the generated styles as a static stylesheet.


Usage
-----


Currently realized:

  styleToSheet.addRule('div a', 'padding: 0; color: green;')

  styleToSheet.downloadStyles()

  styleToSheet.showStyles()


TODO:
  styleToSheet.delProp('div a', 'padding')
  
  styleToSheet.delRule('div a')

  styleToSheet.delRules()



Why
---

1.) Share script-variables with stylesheets, because we can
    then set a className on an ele and use it furtheron as
    a selector for the styling, and bind functions to eles
    with that className.

    Note: It is possible to share CSS-vars with scripts, but
    then again a script needs to know the property-name of
    the css-var.


2.) Do everything in Javascript, no CSS-prepocessors like
    LESS or SASS, so one doesn't need to know about yet
    another tool, which saves time.

3.) Have a programmatical way to write CSS, as human-written
    CSS is prone to inconsistencies, such as rules which are
    declared several times or properties which are declared
    several times within a rule. Won't happen with this tool.


How
---

Contain a rules-object and modification-functions for it.
Insert rules into stylesheet in head-ele on any modification.
Provide function for downloading stylesheet.



Variable names and structures
-----------------------------

  selector     = 'body > div'

  style        = 'background: red; color: green;'

  styles        = 'div a {background: red; } body a { color: green; }'

  props        = { background: 'red', color: 'green', } 

  rule         = [selector, props]


*/


  rules: [],         // know the rules before you break them
  selectors: [],    //  needed for quick-comparison in selectorExists()
  styleEle: null,  //   output rules on any changement in this ele
  prefix: '',     //    optionally prefix all rules with a selector


  addRule: function(selector, style) {

    // Initially add style-ele when first rule is added:
    if( ! this.styleEle ) this.addStyleEle()

    selector = this.prefix + selector

    // Compare and update rules:
    var props = this.getProps(style)

    // Selector exists:
    if(this.selectorExists(selector) ) {
      for(var i in this.rules) {
        var rule =   this.rules[i]
        var ruleProps =    rule[1]
        var ruleSelector = rule[0]

        // Rule has same selector than passed one:
        if(selector == ruleSelector) {
          for(var propName in props) {
            var propVal = props[propName]

            // Prop-val differs:
            if(ruleProps[propName] != propVal) {
              // Set new val:
              rule[1][propName] = propVal
            }
          }
        }
      }
    }
    // Selector does not exist:
    else {
      // Add new rule:
      this.rules.push([selector, props])
      // Collect selector:
      this.selectors.push(selector)
    }
    
    
    // Set new rules:
    this.setStyles()
    
    
  },


  addStyleEle: function() {
    var parentEle = document.getElementsByTagName('head')[0]
    var ele = document.createElement('style')
    parentEle.appendChild(ele)
    this.styleEle = ele
  },


  downloadStyles: function(fileName='styles.css') {
    var a = addEle(document.body, 'Download styles', 'a')
    a.setAttribute('download', fileName)
    a.href = 'data:application/csv;charset=utf-8,'
            + encodeURIComponent(this.getStyles())
    a.click()
  },


  getProps: function(style) {
    style = style.split(';')
    var props = {}
    for(var i in style) {
      var pair = style[i].split(':')
      if(pair != '') {
        var prop = pair[0].trim()
        if(prop != '') {
          var val  = pair[1].trim()
          props[prop] = val
        }
      }
    }
    return props
  },


  getRules: function() {
    var rules = getStyles().split('}')
    return rules
  },


  getStyles: function() {
    return this.styleEle.innerHTML
  },


  selectorExists: function(selector) {
    for(var i in this.selectors) {
      if(this.selectors[i] == selector) {
        return true
      }
    }
    return false
  },


  setStyles: function() {

    var styles = ''

    for(var i in this.rules) {

      var rule     = this.rules[i]
      var selector = rule[0]
      var props    = rule[1]

      styles += selector + ' {\n'

      for(var name in props) {
        styles += '  '
        styles += name
        styles += ': '
        styles += props[name]
        styles += ';\n'
      }
      styles += '}\n'
    }
    this.styleEle.innerHTML = styles
  },


  showStyles: function(ele=document.body) {
    // Initially add style-ele, if not existing yet:
    if( ! this.styleEle ) this.addStyleEle()


    var html = ''
    var styles = this.getStyles().split('\n')
    for(var i in styles) {
      html += styles[i] + '<br>'
    }
    ele.innerHTML = html
  },


} // EO styleToSheet
var appName = 'tabulaCasa'

function addApp(appEle) {
  styleToSheet.prefix = '.' + appName + ' '
  if(appEle===null) appEle = document.body
  appEle.className = appName
  return appEle
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
var cellDeli = ','
var cellDeli = ';'
var rowDeli = '\n'

function main(appEle=null) {

  appEle = addApp(appEle)
  addAppStyles()

  var controlsEle = addEle(appEle)
  controlsEle.className = 'controls'
  addControls(controlsEle)
  addControlsStyle('.' + controlsEle.className + ' ')

  var tablesEle = addEle(appEle)
  tablesEle.className = 'tables'
  addTableStyle('.' + tablesEle.className + ' ')

  showTable(getKey())
}
document.addEventListener("DOMContentLoaded", function(event) { reload(
9994000); document.body.style = 'background: #000; color: #fff;'

//dev('branch: master')
setTimeout(function() {
  addTable(1, csv)

  var ele = document.getElementsByClassName('positions')[0]
  ele.value = 4
  var ele = document.getElementsByClassName('what')[0]
  ele.focus()
  ele = ele.children[ele.children.length-1]
  ele.selected=true


}, 277);

}); // DOM loaded //////////////////////////////////////////////////////
function reload(ms=2727) {
  setInterval(function() {
    window.location.href = window.location.href
  }, ms);
}
function dev(html='') {
  var devEleId = 'dev'
  var devEle = document.getElementById(devEleId)
  if(devEle == null) { // create devEle, if it doesn't exist already
    var parentEle = document.body
    devEle = document.createElement('div')
    devEle.id = devEleId
    parentEle.insertBefore(devEle, parentEle.firstChild)
  }
  html += '<br>' // append passed html to devEle, prepend with a linebreak
  devEle.innerHTML += html
}
var csv = '23.01.1977' + cellDeli + 'Ebkes' + cellDeli + '1' + rowDeli
        + '28.05.1937' + cellDeli + 'Chera' + cellDeli + '2' + rowDeli
        + '02/25/2018' + cellDeli + 'Linde' + cellDeli + '6i' + rowDeli
        + '21.09.2011' + cellDeli + 'Stewa' + cellDeli + '3'
var csv = 'Ida' + cellDeli + 'Ebkes' + cellDeli + '42' + rowDeli
        + 'Udo' + cellDeli + 'Linde' + cellDeli + '6i' + rowDeli
        + 'Ame' + cellDeli + 'Chera' + cellDeli + '14' + rowDeli
        + 'Bob' + cellDeli + 'Stewa' + cellDeli + '33'
var csv = 'Ida' + cellDeli + 'Ebkes' + cellDeli + '42' + rowDeli
        + 'Udo' + cellDeli + 'Linde' + cellDeli + '6i' + rowDeli
        + 'Ame' + cellDeli + 'Chera' + cellDeli + '1,500.00' + rowDeli
        + 'Bob' + cellDeli + 'Stewa' + cellDeli + '33'
function addControlsStyle(controlsSelector) {
  var selector = controlsSelector
  var style = `
    border: 1px solid;
    margin: 1em 0;
    padding: 1em 0;
  `
  styleToSheet.addRule(selector, style)

  selector += 'input'
  style = 'width: 3em;'
  styleToSheet.addRule(selector, style)
}
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
  // In case imported CSV uses other delimiters than
  // this app, convert CSV to fit app, using Papa:
//  csv = Papa.parse(csv)
//  csv = Papa.unparse(csv)
  addTable(getKey(), csv)
}
function genControlsActionHtml() {
  //var html = 'Actions: <select class="action">' +
  var html = '<select class="action">' +
    '<option>add</option>' +
    '<option>del</option>' +
    '<option>move</option>' +
    '<option>import</option>' +
    '<option>sort</option>' +
  '</select>' +
  '<select class="what">' +
    '<option>Row</option>' +
    '<option>Column</option>' +
    '<option>Table</option>' +
    '<option>SumColumn</option>' +
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

  // Execute choosen action when return-/enter-key was pressed:
  controlsEle.onkeyup = function(eve) {
    if(eve.keyCode == 13) { // is return-/enter-key
      var tableKey = getKey()
      var args = [getKey()]
      var action = actionEle.value
      var what = whatEle.value
      var positions = positionsEle.value
      var targetPosition = targetPositionEle.value
      var funcName = action + what
      // Fail silently when existing table wants to be added or non-existing
      // table is supposed to be deleted:
      if( ! (what == 'Table' && ( action == 'add' && keyExists(positions) )
                             || ( action == 'delete' && ! keyExists(positions) )
            )
        ) {
             if(funcName ==         'addRow') addRow(tableKey, positions-1)
        else if(funcName ==      'addColumn') addColumn(tableKey, positions-1)
        else if(funcName ==   'addSumColumn') addSumColumn(positions-1)
        else if(funcName ==       'addTable') addTable(positions)
        else if(funcName ==         'delRow') delRow(tableKey, positions-1)
        else if(funcName ==      'delColumn') delColumn(tableKey, positions-1)
        else if(funcName ==   'delSumColumn') delSumColumn()
        else if(funcName ==       'delTable') delTable(positions)
        else if(funcName ==        'moveRow') moveRow(tableKey, positions-1, targetPosition-1)
        else if(funcName ==     'moveColumn') moveColumn(tableKey, positions-1, targetPosition-1)
        else if(funcName ==     'sortColumn') sortColumnByDate(positions-1)
        else console.info('The selection "' + funcName + '" is not wired to' +
                          ' a function, we ignore that for now, nothing changed.')
      }
    } // is enter-key
  } // a key is pressed
  actionEle.onclick = function(eve) { onSelectionChange(eve, whatEle, targetPositionEle, importEle) }
  actionEle.onkeyup = function(eve) { onSelectionChange(eve, whatEle, targetPositionEle, importEle) }
} // listenControlsAction
function onSelectionChange(eve, whatEle, targetPositionEle, importEle) {
// Show and hide control-eles depending on the choosen options:
  var options = whatEle.getElementsByTagName('option')
  // If 'move' was choosen:
  if(eve.target.value == 'move') {
    // Hide upload-button:
    importEle.style.display = 'none'
    // Show targetPosition-input-field:
    targetPositionEle.style.display = 'inline'
    for(var i=0; i < options.length; i++) {
      // Remove 'Table' from what-options:
      if(options[i].value == 'Table') {
        options[i].remove()
      }
    }
  }
  else {
    // Hide the targetPosition-field:
    targetPositionEle.style.display = 'none'
    // Hide upload-button:
    importEle.style.display = 'none'
    // If 'Table' is not available in options, add it:
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
  // If 'import' was choosen:
  if(eve.target.value == 'import') {
    // Hide targetPosition:
    targetPositionEle.style.display = 'none'
    // Show upload-button:
    importEle.style.display = 'inline'
    // Select 'Table' as what-option:
    for(var i=0; i < options.length; i++) {
      if(options[i].value == 'Table') {
        options[i].setAttribute('selected', 'selected')
      }
    }
  }
} // onSelectionChange

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
function addTableStyle(prefix, showNrs=true) {
  var tableTagName = 'div'
  var rowTagName = 'ul'
  var cellTagName = 'li'

  var tableSelector = prefix + '> ' + tableTagName
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
  styleToSheet.addRule(selector, style)

  selector = rowSelector
  style = 'white-space: nowrap; margin: 0; padding: 0;'
  styleToSheet.addRule(selector, style)

  selector = cellSelector
  style = cellStyle + cellBorder
  styleToSheet.addRule(selector, style)

  selector = cellSelector + ':focus'
  style = cellOverflowStyle
  styleToSheet.addRule(selector, style)

  selector = cellSelector + ':hover'
  style = cellOverflowStyle
  styleToSheet.addRule(selector, style)

  selector = cellSelector + ' input'
  style = 'background: inherit;\n\
  border: none;\n\
  color: inherit;\n\
  font: inherit;\n\
  margin: 0;\n\
  padding: 0;\n'
  styleToSheet.addRule(selector, style)
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
                    2* parseFloat(padding) + 0.01 + // dirty manual adjustment for now
                    parseFloat(borderWidth)/2 + 'em'
  var colNrPosLeft = '0.075em' // hardcoded for now, needs to be computed
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


  selector = tableSelector
  style = 'counter-reset: rowscounter;'
  styleToSheet.addRule(selector, style)

  selector += ':before'
  style = 'content: attr(id);' + rowNrStyle
  style += 'padding-top: 0.15em' // hardcoded for now, needs to be computed
  styleToSheet.addRule(selector, style)

  selector = rowSelector + ':before'
  style = `
    counter-increment: rowscounter;
    content: counter(rowscounter);
    counter-reset: columnscounter;
  ` + rowNrStyle
  styleToSheet.addRule(selector, style)

  selector = tableSelector + ' > *:first-child > *'
  style = colNrParentStyle
  styleToSheet.addRule(selector, style)

  selector = colFirstCellSelector + ':before'
  style = `
  counter-increment: columnscounter;
  content: counter(columnscounter);
  ` + colNrStyle
  styleToSheet.addRule(selector, style)


  } // showNrs
} // addTableStyle
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
      setCell(key, rowPos, cellPos, eve.target.value)
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
