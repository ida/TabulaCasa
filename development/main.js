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
  var controlsEle = addEle(appEle)
  controlsEle.className = 'controls'
  addControls(controlsEle)
  addControlsStyle('.' + controlsEle.className + ' ')

  tablesEle = addEle(appEle)
  tablesEle.className = 'tables'
  addTableStyle('.' + tablesEle.className + ' ')

  var tablesIds = getTableIds()
  for(var i=0; i < tablesIds.length; i++) {
    table = new Table(tablesIds[i], tablesEle)
    tables.push(table)
  }
  table = tables[0]


  if(table === undefined) tablesEle.innerHTML = 'No tables there, yet.'
  else table.show()

}

main(document.body)
