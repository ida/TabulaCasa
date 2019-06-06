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

main(document.body)
