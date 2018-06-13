var cellSeparator = ','
var cellSeparator = ';'
var decimalSeparator = ','
var decimalSeparator = '.'
var rowSeparator = '\n'
var tables = []
var table = null

function addApp(appEle) {
  styleToSheet.prefix = '.' + appName + ' '
  if(appEle===null) appEle = document.body
  appEle.className = appName
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
    table = new Table(tablesIds[i])
    tables.push(table)
  }
  table = tables[0]
  appEle = addApp(appEle)
  addAppStyles()

  var controlsEle = addEle(appEle)
  controlsEle.className = 'controls'
  addControls(controlsEle)
  addControlsStyle('.' + controlsEle.className + ' ')

  var tablesEle = addEle(appEle)
  tablesEle.className = 'tables'
  addTableStyle('.' + tablesEle.className + ' ')

  if(table === undefined) tablesEle.innerHTML = 'No tables there, yet.'
  else table.show()

}

main(document.body)
