function addControls(controlsEle) {
  addSelectTableEle(controlsEle)
  addSelectTableActionEles(controlsEle)
  addControlsListeners(controlsEle)
}
function addControlsListeners(controlsEle) {
  listenTablesSelection(controlsEle
    .getElementsByClassName('tablesSelection')[0])
}
