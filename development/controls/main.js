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
