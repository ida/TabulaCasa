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

  showTable(getTableId())
}

main()
