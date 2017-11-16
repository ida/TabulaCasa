var appName = 'tabulaCasa'
var cellDeli = ','
var rowDeli = '\n'

function main(appEle=null) {

  addStylesheet()

  appEle = addApp(appEle)

  var controlsEle = addEle(appEle)
  controlsEle.className = 'controls'
  addControls(controlsEle)

  var tablesEle = addEle(appEle)
  tablesEle.className = 'tables'

  showTable(getKey())
}
