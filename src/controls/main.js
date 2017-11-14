function addControls(controlsEle) {
  addSelectTableEle(controlsEle)
  addModifyTablesEle(controlsEle)
  addControlsListeners(controlsEle)
}
function addControlsListeners(controlsEle) {
  listenControlsAction(controlsEle
    .getElementsByClassName('actions')[0])
  listenTablesSelection(controlsEle
    .getElementsByClassName('tablesSelection')[0])
}
