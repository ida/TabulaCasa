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
