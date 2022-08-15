function TabulaCasa(appName='TabulaCasa') {
/*


styleToSheet
============

What
----

Dynamically style in Javascript during development,
then export the generated styles as a static stylesheet.


Usage
-----

After adding this script to the head-ele of the doc, the global
variable `styleToSheet` will be available of which you can access
all the properties defined below. The most important ones are:


Add a css-rule to stylesheet:

  styleToSheet.addRule('div a', 'padding: 0; color: green;')


When you're done with styling, add this in your script and reload
page to download the stylesheet for production:

  styleToSheet.downloadStyles()


For comfortably reading the stylesheet at any point of development,
display them in the body-ele:

  styleToSheet.showStyles()


Optionally set a prefix for rule-selectors:

  styleToSheet.prefix = '.prefixAllSelectorsWithThis'




Why
---

1.) Share script-variables with stylesheets, because we can
    then set a className on an ele and use it furtheron as
    a selector for the styling, and bind functions to eles
    with that className.

    Note: It is possible to share CSS-vars with scripts, but
    then again a script needs to know the property-name of
    the css-var.


2.) Do everything in Javascript, no CSS-preprocessors like
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


Authors
-------

Ida Ebkes <contact@ida-ebkes.eu> 2017


License
-------

MIT License, a copy is attached in this folder.

*/


var styleToSheet = {


  rules: [],         // know the rules before you break them
  selectors: [],    //  needed for quick-comparison in selectorExists()
  styleEle: null,  //   output rules on any changement in this ele
  prefix: '',     //    optionally prefix all rules with a selector


  addRule: function(selector, style) {

    // Initially add style-ele when first rule is added:
    if( ! this.styleEle ) this.addStyleEle()

    // Prepend prefix to selector:
    selector = this.prefix + selector

    // Convert passed styles to props for comparison:
    var props = this.styleToProps(style)

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


  addStyle: function(ele, style, includeSiblings=true) {
  // Autogenerate a tree-selector for ele, representing its
  // (grand-)child-position within the body-ele and add a
  // rule with the passed style. If includeSiblings is false,
  // narrow selector down with sibling-pos, too, so only
  // passed ele gets the style, sorry sis.
    var i = 1
    var eleCurrent = ele
    var selector = ''
    while(ele.tagName.toLowerCase() != 'body') {
      eleCurrent = ele
      while(ele.previousElementSibling !== null) {
        i += 1
        ele = ele.previousElementSibling
      }
      ele = eleCurrent
      selector = ' > ' + ele.tagName.toLowerCase() + ':nth-child(' + i + ')' + selector
      i = 1
      ele = ele.parentNode
    }
 
    selector = 'body' + selector

    this.addRule(selector, style)
    return selector
  },


  addStyleEle: function() {
    var parentEle = document.getElementsByTagName('head')[0]
    var ele = document.createElement('style')
    parentEle.appendChild(ele)
    this.styleEle = ele
  },


  addStyles: function(styles) {
    styles = styles.split('{')
    var selector = styles[0]
    var style = styles[1].split('}')[0]
    console.debug(selector, style)
    this.addRule(selector, style)
  },


  downloadStyles: function(fileName='styles.css') {
    var a = document.createElement('a')
    a.innerHTML = 'Download styles'
    a.setAttribute('download', fileName)
    a.href = 'data:application/css;charset=utf-8,'
            + encodeURIComponent(this.getStyles())
    a.style = 'position: fixed; left: 27px; top: 27px; padding: 3em; \
               background: #e2e2e2; color: green; font-size: 1.81em; \
               border-radius: 0.27em;'
    document.body.appendChild(a)
  },


  getRules: function() {
    var rules = this.getStyles().split('}')
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


  styleToProps: function(style) {
    style = style.split(';')
    var props = {}
    for(var i in style) {
      var pair = style[i].split(':')
      if(pair != '') {
        var prop = pair[0].trim()
        if(prop != '') {
          var val = pair[1].trim()
          props[prop] = val
        }
      }
    }
    return props
  },


} // EO styleToSheet

// ELEMENTS

function addEle(parentEle, html=null, tagName='div') {
  var ele = document.createElement(tagName)
  if(html) { ele.innerHTML = html }
  parentEle.appendChild(ele)
  return ele
}
function hideEle(ele) {
  ele.style.display = 'none'
}
function showEle(ele) {
  ele.style.display = 'inline-block'
}

// USER-MESSAGE

function addInfo(msg) {
  var parentEle = table.ele.parentNode.parentNode
  var msgEle = addEle(parentEle, msg)
  parentEle.insertBefore(msgEle, parentEle.firstChild)
  msgEle.style.position = 'absolute'
  var closeMsgEle = addEle(msgEle, 'x', 'span')
  closeMsgEle.tabIndex = 0
  closeMsgEle.onclick = function() { msgEle.remove() }
  closeMsgEle.onkeydown = function(eve) { if(eve.keyCode == 13) eve.target.click() }
  setTimeout(function() { closeMsgEle.click() }, 10000)
}

// POSITIONS

function dataRowPosToVisualRowPos(rowPos) {
// If rowEle does not have visual class, it's a data-row:
//   Subtract 1 of rowPos until it's 0 and return rowElePos
  var tableEle = document.getElementById(table.id)
  var rowEles = tableEle.children
  for(var i=0; i < rowEles.length; i++) {
    var rowEle = rowEles[i]
    if(rowEle.className.indexOf('sum') < 0) {
      rowPos -= 1
    }
    if(rowPos == 0) {
      return i+1
    }
  }
  return null
}

function decimalCommaToDot(value) {
  value = value.replace(/,/, '.')
  return value
}
function isNumber(value) {
  // Regard `Number` returns zero for empty strings.
  return value != '' && isNaN(Number(value)) === false
}
function prettifyNumber(number) {
  // - Always exactly two decimal-digits
  // - Never start with zero, unless number < 1
  // - At least one whole-number-digit
  number = String(number)
  // No dot:
  if(number.indexOf('.') < 0) {
    number = number + '.00'
  }
  // Has dot:
  // Starts with dot:
  else if(number.startsWith('.')) {
    number = '0' + number
  }
  // Ends with dot:
  else if(number.endsWith('.')) {
    number = number + '.00'
  }
  // Has not at least 1 char after dot:
  else if(number.split('.')[1].length < 2) {
    number = number + '0'
  }
  // Has more than 2 chars after dot:
  else if(number.split('.')[1].length > 2) {
    number = number.slice(0, number.indexOf('.') + 3)
  }
  number = thousandifyNumberString(number)

  return number

} // prettifyNumberString


function prettifyNumbers(numbers) {

  for(var i=0; i < numbers.length; i++) {
    var number = numbers[i]
    number = prettifyNumber(number)
    numbers[i] = number
  }

  return numbers

} // prettifyNumbers


function thousandifyNumberString(numberStr) {
// '1000000.00' ---> '1,000,000.00'
  var countdown = 3
  var i = numberStr.length
  var s = ''
  while(i > 0) {
    countdown -= 1
    i -= 1
    s = numberStr[i] + s
    if(numberStr[i] == '.') countdown = 3
    if(countdown == 0) {
      if(i < 0) s = ',' + s
      countdown = 3
    }
  }

  return s

} // thousandifyNumberString


function valueToNumber(value, NanEqualsZero=false) {
  // If value is not a number and NanEqualsZero is true, return zero.
  // `decimalSeparator` is expected to be present as a glob-var.
  var thousandsSeparator = ','
  if(decimalSeparator == ',') {
    thousandsSeparator = '.'
  }
  value = stripThousandsSeparator(value, thousandsSeparator)
  if(decimalSeparator == ',') value = decimalCommaToDot(value)
  value = Number(value)
  if(NanEqualsZero === true && isNaN(value) === true) value = Number(0)
  return value
}
function stripThousandsSeparator(value, separator=',') {
  value = value.split(separator).join('')
  return value
}


function addNDaysToDate(date, days) {
  var dates = genDates(date, days)
  return dates[dates.length-1]
}
function dateEqualsOtherDate(aDate, anotherDate) {
  anotherDate = Number(dateToNumberString(anotherDate))
  aDate = Number(dateToNumberString(aDate))
  return anotherDate - aDate == 0
}
function dateIsOlderThanOtherDate(aDate, anotherDate) {
  anotherDate = Number(dateToNumberString(anotherDate))
  aDate = Number(dateToNumberString(aDate))
  return anotherDate - aDate > 0
}

function dateNumberToDate(dateNr) {
  // Expects 'YYYYMMDD', returns 'DD.MM.YYYY'.
  var string = String(dateNr)
  string = string.slice(6)    + '.'
         + string.slice(4, 6) + '.'
         + string.slice(0, 4)
  return string
}

function dateToNumberString(string) {
  // Expects 'DD.MM.YYYY' or 'MM/DD/YYYY', returns 'YYYYMMDD'.
  if(string.indexOf('/') > -1) {
    string = string.slice(3, 5) + '.'
           + string.slice(0, 2) + '.'
           + string.slice(6, 10)
  }
  return string.split('.').reverse().join('')
}

function genDates(startDate, days) {
  var dateNumberString = dateToNumberString(startDate)
  var dateNumber = Number(dateNumberString)
  var daysLeft = getDaysUntilEndOfMonth(dateNumberString)
  var dates = [startDate]
  var date = null
  while(days > 0) {
    if(daysLeft == 0) { // month's over
      if(String(dateNumber).slice(4, 6) == 12) { // year's over
        dateNumber -= 1100
        dateNumber += 10000
      }
      dateNumber += 100
      dateNumber = parseInt(dateNumber/100) * 100
    }
    dateNumber += 1
    date = dateNumberToDate(dateNumber)
    dates.push(date)
    daysLeft -= 1
    days -= 1
  }
//  console.debug(dates.length,dates)
  return dates
}

function getDayNrOfDateNrStr(dateNrStr) {
  return Number(dateNrStr.slice(6, 8))
}

function getDaysOfMonth(monthNrOrStr) {
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  monthNrOrStr = Number(monthNrOrStr) - 1
  return Number(monthDays[monthNrOrStr])
}

function getDaysOfMonths(monthNew, monthOld) {
  var days = 0
  while(monthOld < monthNew) {
    monthOld += 1
    days += getDaysOfMonth(monthOld)
  }
  return days
}

function getDaysUntilEndOfMonth(dateNrStr) {
  var day = getDayNrOfDateNrStr(dateNrStr)
  var days = getDaysOfMonth(getMonthNrOfDateNrStr(dateNrStr))
  return days - day
}

function getMonthNrOfDateNrStr(dateNrStr) {
  return Number(dateNrStr.slice(4, 6))
}

function getYearNrOfDateNrStr(dateNrStr) {
  return Number(dateNrStr.slice(0, 4))
}

function getDateDiffInDays(aDate, anotherDate) {

  aDate = dateToNumberString(aDate)
  anotherDate = dateToNumberString(anotherDate)

  var days = null
  var dateNew = aDate
  var dateOld = anotherDate

  if(dateIsOlderThanOtherDate(aDate, anotherDate) == true) {
    dateNew = anotherDate
    dateOld = aDate
  }

  var dayNew = getDayNrOfDateNrStr(dateNew)
  var dayOld = getDayNrOfDateNrStr(dateOld)

  var monthNew = getMonthNrOfDateNrStr(dateNew)
  var monthOld = getMonthNrOfDateNrStr(dateOld)

  days = dayNew - dayOld     // same month

  if(monthNew != monthOld) { // months differ
    days = getDaysUntilEndOfMonth(dateOld)
    monthOld += 1
    days += getDaysOfMonths(monthNew, monthOld)
    days += dayNew
  }

  days += 365 * (getYearNrOfDateNrStr(dateNew) - getYearNrOfDateNrStr(dateOld))

  return days
}


/*

addDependentFieldAction
=======================

What
----

Do something with an ele, if another ele changes its value and
differentiate what to do with the ele, depending on the current value
of the other ele.

Why
---

Not displaying unneeded information gives a better user-experience,
because the brain does not need to filter out irrelevant input.


How
---

Adds the properties 'dependentFields' and 'changeDependentFields' to
the ruling major-field. First is a map, holding the dependent-fields
and which actions are to be done, if major-field changes, second is
executing the actions of the map and is attached to the change-event
if the major-field.


Usage
-----

After adding this script to your doc, a func named 'addDependentFieldAction'
is available at your service. No other globs are introduced.

This directory should also contain an html-file of same name than this
script, which loads this script. You can open it in a browser and uncomment
the following lines, for live-testing. */

/* [remove this line for testing]

// Wait until all eles are present:
document.addEventListener('DOMContentLoaded', function() {

  // Assume two select-eles and an input-ele are present, where the first
  // ele has the options 'Plant', 'Animal' and 'Ghost':
  var anEle      = document.getElementsByTagName('select')[0]
  var anotherEle = document.getElementsByTagName('select')[1]
  var aTextEle   = document.getElementsByTagName('input')[0]

  // Now we can tell the other ele to change its options depending
  // on the value of the first ele, like this:
  addDependentFieldAction(anEle, anotherEle, 'Animal', ['Cat', 'Cow'])
  addDependentFieldAction(anEle, anotherEle, 'Plant',  ['Avocado', 'Cocoa'])

  // We can also pass a function, the other ele will be passed to it:
  addDependentFieldAction(anEle, anotherEle, 'Ghost',
                          function(ele) { ele.style.visibility = 'hidden' })

  // Make sure the other ele is always visible, when Ghost is not selected:
  function show(ele) { ele.style.visibility = 'visible' }
  addDependentFieldAction(anEle, anotherEle, 'Plant',  show)
  addDependentFieldAction(anEle, anotherEle, 'Animal', show)

  // If the dependent-field is not a select-ele, but a text-input, simply
  // pass a string instead of an array as the value to be set:
  addDependentFieldAction(anotherEle, aTextEle, 'Cat', 'Delicious with lemons')
  addDependentFieldAction(anotherEle, aTextEle, 'Cow', 'Perfect flat-pet')
  addDependentFieldAction(anotherEle, aTextEle, 'Avocado', 'Holy guacamoly')
  addDependentFieldAction(anotherEle, aTextEle, 'Cocoa', 'Plant of the gods')


}); // doc loaded

// [remove this line for testing] */

/*

Author
------

Ida Ebkes <contact@ida-ebkes.eu>, 2018.


License
-------

MIT

*/

function addDependentFieldAction(major, minor, majorValue, action) {
// major: A field-ele.
// minor: An ele to be manipulated when value in major changes.
// majorValue: The value in major when the minor-action should be done.
// action: A function which gets minor passed, or an array for option-values
//         to be set in minor, or a string if minor is a text-field.


  var majorValueToMinorActionsMap = null

  major.changeDependentFields = function(major) {
  // Get current value of major, look up and
  // do corresponding actions of minor-maps.

    for(var [minor, value] of major.dependentFields) {

      var actions = value[major.value]

      // If actions are not found, abort:
      if(actions === undefined) { return }

      for(var i=0; i < actions.length; i++) {
        var action = actions[i]

        // Action is a function, execute it and pass minor-field to it:
        if(action instanceof Function) {
          action(minor)
        }
        // Action is an array, insert it as option-eles in minor-field:
        else if(action instanceof Array) {
          var selectedValue = minor.value // remember selection
          minor.innerHTML = ''
          for(var j=0; j < action.length; j++) {
            var option = document.createElement('option')
            option.innerHTML = action[j]
            minor.appendChild(option)
          }
          minor.value = selectedValue // reset selection
        }
        // Action is a string, insert it as value in minor-field:
        else {
          minor.value = action
        }
      }
      // If minor is also a major of another minor, update minor, too:
      if(minor.dependentFields !== undefined) {
        minor.changeDependentFields(minor)
      }
    }
  } // EO changeDependentFields


  // Initially create dependentFields-map and attach change-listener:
  if(major.dependentFields === undefined) {
    major.dependentFields = new Map()
    major.onchange = function(eve) { major.changeDependentFields(major) }
  }

  // If it's the first action for the dependent-field, add and empty
  // object, representing the majorValueToMinorActionsMap:
  if(major.dependentFields.get(minor) === undefined) {
    major.dependentFields.set(minor, {})
  }

  // Get actions-map:
  majorValueToMinorActionsMap = major.dependentFields.get(minor)

  // If the majorValueToMinorActionsMap doesn't have an action for
  // the majorValue yet, add an empty array for the actions:
  if(majorValueToMinorActionsMap[majorValue] === undefined) {
    majorValueToMinorActionsMap[majorValue] = []
  }

  // Finally add action to actions-map:
  majorValueToMinorActionsMap[majorValue].push(action)

  // Lastly after changing actions-map, do the change-func:
  major.changeDependentFields(major)

} // EO addDependentFieldAction

function addUploadButton(containerEle, doWithContentAfterUpload) {
// Append a browse-button to containerEle for selecting files to upload,
// do something with the uploaded content after selection got confirmed
// by user. Usage example:
//
//    var containerEle = document.body
//    function doSthAfterUpload (content) { console.debug(content) }
//    addUploadButton(containerEle, doSthAfterUpload)
//

  function addFilesInputEle(containerEle) {
    var input = document.createElement('input')      // create input
    input.type = 'file'                      // make it a file-input
    input.setAttribute('multiple', 'true')  // enable multiple files
    containerEle.appendChild(input)         // insert input in DOM
    return input
  }
  function provideInputEle(containerEle, reader) {
    var input = addFilesInputEle(containerEle)        // add input
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
  function provideFileUpload(containerEle, doAfterFileUpload) {
    var reader  = provideFileReader(doAfterFileUpload)
    var input = provideInputEle(containerEle, reader)
    return input
  }

  return provideFileUpload(containerEle, doWithContentAfterUpload)

} // addUploadButton

function addOptionEles(optionsParent, options, selectedIndex=0) {
  for(var i=0; i < options.length; i++) {
    var optionEle = document.createElement('option')
    optionEle.value = options[i]
    optionEle.innerHTML = options[i]
    optionsParent.appendChild(optionEle)
  }
}
function addSelectEle(selectionParent, options=[], selectedIndex=0) {
  var selectEle = document.createElement('select')
  addOptionEles(selectEle, options)
  selectEle.selectedIndex = selectedIndex
  selectionParent.appendChild(selectEle)
  return selectEle
}
function getSelectedOptionEle(selectEle) {
  return selectEle.children[selectEle.selectedIndex]
}
function getSelectedValue(selectEle) {
  var selectedOption = getSelectedOptionEle(selectEle)
  var value = selectedOption.innerHTML
  return value
}
function getSelectionValues(selectEle) {
  var values = []
  for(var i=0; i < selectEle.children.length; i++) {
    values.push(selectEle.children[i].innerHTML)
  }
  return values
}
function setOptions(selectEle, values) {
  selectEle.innerHTML = ''
  addOptionEles(selectEle, values)
}
function selectByValue(selectEle, value) {
  var values = getValues(selectEle)
}

function addControls(controlsEle) {
  addSelectTableEle(controlsEle)
  addSelectTableActionEles(controlsEle)
  addControlsListeners(controlsEle)
  var config = new Configuration(controlsEle)
}
function addControlsListeners(controlsEle) {
  listenTablesSelection(controlsEle
    .getElementsByClassName('tablesSelection')[0])
}

function Configuration(parentEle=null) {
  this.config = {
    defaultCells: [3, 3], // columns- and rows-amount for freshly added tables, is nullable
    useHeaderCells: true, // whether or not the first cells are supposed to be header-cells
  }
  if(parentEle) this.addEle(parentEle)
}
Configuration.prototype.addEle = function(parentEle) {
  var lockSymbol = '&#x1f512;'
  var gearWheelSymbol = '&#x2699;'
  var configEle = addEle(parentEle, gearWheelSymbol, 'button')
  configEle.onclick = function() {
    alert('The config-button has not been implemented, yet.')
  }
}
Configuration.prototype.getProp = function(propName) {
  return this.config[propName]
}
Configuration.prototype.getProps = function(propName) {
  return this.config
}
Configuration.prototype.setProp = function(propName, propValue=null) {
  var err = 'Configuration.setProp says "' + propName +
  '" is invalid. Omitting to set it, nothing changed.'
  if( ! this.config[propName]) throw new Error(err)
  else this.config[propName] = propValue
}

function addSelectTableEle(controlsEle) {

  var html = genTablesSelectionHtml()

  var controlEle = addEle(controlsEle, html, 'span')

  controlEle.className = 'tablesSelection'

}
function genTablesSelectionHtml(selectedTableId=null) {

  var html = '<select>'

  for(var i=0; i < tables.length; i++) {

    html += '<option'

    if(
        (selectedTableId === null && i==0)
      ||
        (selectedTableId !== null && tables[i].id == selectedTableId)
      ) {

      html += ' selected'
    }

    html += '>' + tables[i].id + '</option>'
  }

  html += '</select>'

  return html

}
function listenTablesSelection(tablesSelectionEle) {
  var tablesSelectEle = tablesSelectionEle.children[0]
  tablesSelectEle.onchange = function(eve) {
    for(var i=0; i < eve.target.children.length; i++) {
      if(eve.target.children[i].selected === true) {
        // Switch context of glob-var 'table' to new table:
        for(var j=0; j < tables.length; j++) {
          if(eve.target.children[i].value == tables[i].id) {
            table = tables[i]
          }
        }
        // Show newly selected table:
        table.show()
      }
    }
  }
}
function updateTablesSelection(key) {
  var tablesSelectionEle = getComponentEle(getAppEle(), 'tablesSelection')
  tablesSelectionEle.innerHTML = genTablesSelectionHtml(key)
  listenTablesSelection(tablesSelectionEle)
}

function addSelectTableActionEles(parentEle) {

  parentEle = addEle(parentEle, null, 'span')
  parentEle.className = 'selectTableAction'

  var actionOptions = ['add', 'clone', 'del', 'move', 'import', 'sort']
  var actionEle = addSelectEle(parentEle, actionOptions)
  var whatOptions = ['Row', 'Column', 'SumColumn', 'SumRow', 'Table', 'SumRowPerMonth', 'SumRowPerWeek']
  var whatEle = addSelectEle(parentEle, whatOptions)
  var startNrEle = addEle(parentEle, null, 'input')
  var targetNrEle = addEle(parentEle, null, 'input')
  var importEle = addCustomUploadButton(parentEle)
 
  // Set options of following fields depending on value of preceding fields:
  addDependentFieldAction(actionEle, whatEle, 'add', whatOptions)
  whatOptions = ['Row', 'Column', 'Table']
  addDependentFieldAction(actionEle, whatEle, 'del', whatOptions)
  whatOptions = ['Row', 'Column']
  addDependentFieldAction(actionEle, whatEle, 'move', whatOptions)
  whatOptions = ['Table']
  addDependentFieldAction(actionEle, whatEle, 'clone', whatOptions)
  addDependentFieldAction(actionEle, whatEle, 'import', whatOptions)
  whatOptions = ['Column']
  addDependentFieldAction(actionEle, whatEle, 'sort', whatOptions)

  // Hide importEle for all actions, but action 'import':
  for(var i=0; i < actionOptions[i].length; i++) {
    addDependentFieldAction(actionEle, importEle, actionOptions[i], hideEle)
  }
  addDependentFieldAction(actionEle, importEle, 'import', showEle)

  // When import was chosen...
  addDependentFieldAction(actionEle, importEle, 'import', function(dependentEle) {
    // ... insert current table-id into startNr-input and set focus on it:
    startNrEle.value = table.id; startNrEle.focus()
  });

  // Hide targetNrEle for all actions, but 'clone' and 'move':
  for(var i=0; i < actionOptions[i].length; i++) {
    addDependentFieldAction(actionEle, targetNrEle, actionOptions[i], hideEle)
  }
  addDependentFieldAction(actionEle, targetNrEle, 'clone', showEle)
  addDependentFieldAction(actionEle, targetNrEle, 'move', showEle)

  listenSelectTableActionEles(parentEle)
}
function addCustomUploadButton(parentEle) {
  // Insert 'Upload'-wrapper:
  var ele = addEle(parentEle, '', 'span')
  var wrapper = ele
  ele.style = 'position: relative; top: 0; left: 0; display: none;'
  // Insert 'Upload'-button:
  addEle(ele, 'Upload', 'span')
  // Insert 'Browse'-button:
  ele = addUploadButton(ele, doAfterFileUpload)
  // Hide 'Browse', leave 'Upload' visible:
  ele.style = '\
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

  return wrapper
}
function doAfterFileUpload(csv, displayTable=true) {
  setTable(table.id, csv, displayTable)
}
function callSelectedTableAction(args) {
  args = modulateTableActionArgs(args)
  if(table === undefined) {
    addTable(args[2]) // also sets var 'table'
    // Remove text-node "There are no tables, yet":
    table.ele.parentNode.firstChild.remove()
  }
  else table[args.shift() + args.shift()](...args)
}
function getActionValues(actionsEle) {
  var args = []
  for(var i=0; i < actionsEle.children.length; i++) {
    args.push(actionsEle.children[i].value)
  }
  return args
}
function listenSelectTableActionEles(parentEle) {
  parentEle.onkeydown = function(eve) {
    if(eve.keyCode == 13) { // is enter/return-key
      var args = getActionValues(parentEle)
      if(validateTableActionArgs(args) === true) callSelectedTableAction(args)
    }
  }
}
function modulateTableActionArgs(args) {
  var startNr = args[2]

  if(args[1] != 'Table') {

    // startNr is not a nr:
    if(isNumber(startNr) === false) {

      // Default to last pos:
      if(args[1].indexOf('Row') != -1) {
        startNr = getLastRowPos(table.id)
      }
      else if(args[1].indexOf('Column') != -1) {
        startNr = getLastColumnPos(table.id)
      }

      // For add-actions default to one more than last pos:
      if(args[0] == 'add') startNr += 1
    }
    // startNr is a nr, transform entered human-number to list-position:
    else startNr -= 1

    args[2] = startNr
  }
  return args
}
function validateTableActionArgs(args) {
  if(args[1] == 'Table') {
    var tableId = args[2]
    if(tableId == '') {
      addInfo('Please enter a name for the table.')
      return false
    }
    else if(tableIdExists(tableId) && args[0] == 'add') {
      addInfo('A table named "' + args[2] + '" exists already.')
      return false
    }
    return true
  }
  return true
}


function addControlsStyle(controlsSelector) {
  var selector = controlsSelector
  var style = `
    padding: 1em 0;
    position: fixed;
    bottom: 0;
    left: 0;
    background: black;
    width: 100%;
  `
  styleToSheet.addRule(selector, style)

  selector += 'input'
  style = 'width: 3em;'
  styleToSheet.addRule(selector, style)

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
        cells = rows[i].split(cellSeparator)
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
      // And it does not contain an input-ele, yet (here: no children):
      if(eve.target.children.length < 1) {
        // Insert an input-ele:
        insertInput(eve.target)
      }
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
      var key = tableEle.id
      setCell(key, rowPos, cellPos, eve.target.value)
    }
    // When a cell gains focus:
    cells[i].onfocus = function(eve) {
      // Simulate click in it:
      eve.target.click()
    }
  }
}

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
    cell = dateToNumberString(cell)

    // Omit comparison for first row:
    if(rowPos != 0) {

      rowNewPos = rowPos
      rowPreviousPos = rowPos - 1

      while( rowPreviousPos >= 0) {

        // Get previous cell:
        cellPrevious = getCellOfRows(rows, rowPreviousPos, colPos)
        cellPrevious = dateToNumberString(cellPrevious)

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

function addTableStyle(prefix, showNrs=true) {

  var tableTagName = 'div'
  var rowTagName = 'ul'
  var cellTagName = 'li'

  var tableSelector = prefix + '> ' + tableTagName
  var rowSelector = tableSelector + ' > ' + rowTagName
  var cellSelector = rowSelector + ' > ' + cellTagName
  var sumRowSelector = tableSelector + ' > ' + rowTagName + '.sum'
  var sumCellSelector = sumRowSelector + ' > ' + cellTagName
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
  margin-bottom: ${parseFloat(lineHeight)*3}em; /* leave space for fixed controls-menu */
  border-right: 1px solid;
  border-bottom: 1px solid;
  line-height: ` + lineHeight + ';'
  styleToSheet.addRule(selector, style)

  selector = rowSelector
  style = 'white-space: nowrap; margin: 0; padding: 0;'
  styleToSheet.addRule(selector, style)

  selector = sumCellSelector
  style = 'font-weight: bold;'
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
  min-width: 2.27em;\n\
  ' // rowNrStyle


  selector = tableSelector
  style = 'counter-reset: rowscounter;'
  styleToSheet.addRule(selector, style)

  selector += ':before'
  style = 'content: attr(id);' + rowNrStyle
  style += 'padding-top: 0.15em' // hardcoded for now, needs to be computed
  styleToSheet.addRule(selector, style)

  selector = rowSelector + ':not(.sum):before'
  style = `
    counter-increment: rowscounter;
    content: counter(rowscounter);
    counter-reset: columnscounter;
  ` + rowNrStyle
  styleToSheet.addRule(selector, style)

  selector = rowSelector + '.sum:before'
  style = `
    content: "sum";
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
    cellValue = rows[i].split(cellSeparator)[colPos-1]

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
    cells = row.split(cellSeparator)
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
  var cells = row.split(cellSeparator)
  var date = cells[dateColumnPos]
  var startFromRowPos = 0
  for(var i=1; i < rows.length; i++) {
    row = rows[i]
    cells = row.split(cellSeparator)
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
  var cells = row.split(cellSeparator)
  var date = cells[dateColumnPos]
  var startFromRowPos = 0
  for(var i=1; i < rows.length; i++) {
    row = rows[i]
    cells = row.split(cellSeparator)
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
  var cells = row.split(cellSeparator)
  var date = dateToNumberString(cells[dateColumnPos])
  var month = date.slice(4, 6)
  var startFromRowPos = 0
  for(var i=1; i < rows.length; i++) {
    row = rows[i]
    cells = row.split(cellSeparator)
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
    var date = rows[startRowPos].split(cellSeparator)[dateColumnPos]
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
    var cell = rows[i].split(cellSeparator)[colPos]
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


function addCalendarColumn(startDate, days, columnPos=0) {
  // startDate is expected to look like: '01.01.1970'
  // days is expected to be a whole positive number
  var dateNumberString = dateToNumberString(startDate)
  var dates = genDates(startDate, days)
  for(var i=0; i < dates.length; i++) {
    var date = dates[i]
    table.addRow(i)
    setCell(table.id, i, columnPos, date)
  }
}
function addCalendarColumnYear(year=1970, columnPos=0) {
// Add a column with a date-entry for each day of the year.
  var day = null
  var days = null
  var date = null
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  var months = 12

  while(months > 0) {
    days = monthDays[months-1]
    day = 0
    while(days > 0) {

      day += 1

      date = ''

      if(day < 10) date = '0'

      date += day

      date += '.'

      if(months < 10) date += '0'

      date += String(months) + '.' + String(year)

      table.addRow(day-1)

      setCell(table.id, day-1, columnPos, date)

      days -=1

    }
    months -= 1
  }
  table.show()
}

function addColumnHeadersPerRow(table) {
// Show column-header above any cell.
  var style = window.getComputedStyle(table.ele.children[0].children[0])
  var col = style.getPropertyValue('color')
  var bgCol = style.getPropertyValue('background-color')
  style = `
    li:before {
      background: black;
      color: white;
      display: block;
    }
  `

  var headers = localStorage.getItem(table.id).split(rowSeparator)[0].split(cellSeparator)
  var rowEles = table.ele.children
  var rowEle = rowEles[0]
  var cellEles = rowEle.children

  for(var j=0; j < cellEles.length; j++) {

    var header = headers[j]

    if(header == '') header = '[Empty Header]'

    var number = Number(j) + 1

    style += `ul:not(:first-child) li:nth-child(${number}):before {
      content: "${header}";
      display: block;
    }`
  }


  var styleEle = addEle(document.head, style, 'style')
}

function addAppStyles(prefix) {

  styleToSheet.prefix = prefix

  var background = '#000'
  var color = '#fff'
  var background = 'inherit'
  var color = 'inherit'

  var selector = ''
  var style = `
    background: ` + background  + `;
         color: ` + color       + `;
  `
  styleToSheet.addRule(selector, style)


  style += 'background: green;'
/*
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
*/

}

function Table(id, parentEle) {
  this.id = id
  this.ele = null
  this.addColumn = function(columnPos) {
    addColumn(this.id, columnPos)
  }
  this.addRow = function(rowPos) {
    addRow(this.id, rowPos)
  }
  this.addSumColumn = function(columnPos) {
    addSumColumn(this.id, columnPos)
  }
  this.addSumRow = function(rowPos) {
    addSumRow(this.id, rowPos)
  }
  this.addSumRowPerMonth = function() {
    addSumRowEveryNMonths(this.id)
  }
  this.addSumRowPerWeek = function() {
    addSumRowPerWeek(this.id)
  }
  this.addTable = function(tableId) {
    addTable(tableId)
  }
  this.cloneTable = function(sourceTableId, targetTableId) {
    cloneTable(sourceTableId, targetTableId)
  }
  this.delColumn = function(columnPos) {
    delColumn(this.id, columnPos)
  }
  this.delRow = function(rowPos) {
    delRow(this.id, rowPos)
  }
  this.delTable = function(tableId) {
    delTable(tableId)
  }
  this.moveColumn = function(columnPos, targetPos) {
    moveColumn(this.id, columnPos, targetPos)
  }
  this.moveRow = function(rowPos, targetPos) {
    moveRow(this.id, rowPos, targetPos)
  }
  this.importTable = function(tableId) {
    importTable(this.id, tableId)
  }
  this.sortColumn = function(columnPos) {
    sortColumnByDate(this.id, columnPos)
  }
  this.ini(parentEle)
}
Table.prototype.ini = function(parentEle) {
  this.ele = addEle(parentEle)
  this.ele.id = this.id
}

Table.prototype.show = function() {
  showTableOnly(this.id)
}

var cellSeparator = ','
var cellSeparator = ';'
var decimalSeparator = ','
var decimalSeparator = '.'
var rowSeparator = '\n'
var table = null
var tables = []
var tablesEle = null

function addApp(appEle) {
  if(appEle===null) appEle = document.body
  appEle.className = appName
  addAppStyles('.' + appEle.className + ' ')
  return appEle
}
function getAppEle() {
  return document.getElementsByClassName(appName)[0]
}
function getComponentEle(appEle, componentName) {
  return appEle.getElementsByClassName(componentName)[0]
}
function main(appEle=null) {

  appEle = addApp(appEle)

  tablesEle = document.createElement('div')
  tablesEle.className = 'tables'
  addTableStyle('.' + tablesEle.className + ' ')

  var tablesIds = getTableIds()
  for(var i=0; i < tablesIds.length; i++) {
    table = new Table(tablesIds[i], tablesEle)
    tables.push(table)
  }
  table = tables[0]

  var controlsEle = addEle(appEle)
  controlsEle.className = 'controls'
  addControls(controlsEle)
  addControlsStyle('.' + controlsEle.className + ' ')

  appEle.appendChild(tablesEle)

  if(table === undefined) tablesEle.innerHTML = 'No tables there, yet.'
  else table.show()

  // Device-distinction desktop/mobile:
  var screenWidth = parseFloat( window.getComputedStyle(document.body).getPropertyValue('width') )
  if(screenWidth < 555) {
    addColumnHeadersPerRow(tables[0])
    // Remove styles:
    var styleEles = document.getElementsByTagName('style')
    var styleEle = styleEles[0]
    var styles = styleEle.innerHTML
    styles = '@media (min-width: 500px) {' + styles + '}'
    styleEle.innerHTML = styles
	}

}

setTimeout(main, 500)



}

TabulaCasa()