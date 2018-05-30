var cellDeli = ','
var cellDeli = ';'
var decimalSeparator = '.'
var decimalSeparator = ','
var rowDeli = '\n'
var tables = []
var table = null

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

  var tablesIds = getTableIds()
  for(var i=0; i < tablesIds.length; i++) {
    table = new Table(tablesIds[i])
    tables.push(table)
  }
  showTable(getTableId())
}

main()
