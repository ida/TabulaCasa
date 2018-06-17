var cellSeparator = ';'
var decimalSeparator = '.'
var rowSeparator = '\n'

var tables = []
var table = null


function addApp(appEle) {
  if(appEle===null) appEle = document.body
  appEle.className = appName
  styleToSheet.prefix = '.' + appName + ' '
  addAppStyles()
  return appEle
}


function getAppEle() {
  return document.getElementsByClassName(appName)[0]
}


function getComponentEle(appEle, componentName) {
  return appEle.getElementsByClassName(componentName)[0]
}


function main(appEle=null) {

  var tablesIds = getTableIds()
  for(var i=0; i < tablesIds.length; i++) {
    table = new Table(tablesIds[i], appEle)
    tables.push(table)
  }

  table = tables[0]

  appEle = addApp(appEle)


/*
  var controlsEle = addEle(appEle)
  controlsEle.className = 'controls'
  addControls(controlsEle)
  addControlsStyle('.' + controlsEle.className + ' ')

  var tablesEle = addEle(appEle)
  tablesEle.className = 'tables'
  addTableStyle('.' + tablesEle.className + ' ')

  if(table === undefined) tablesEle.innerHTML = 'No tables there, yet.'
  else table.show()

*/

}

main(document.body)
