function addModifyTablesEle(controlsEle) {
  // Add actionEle (add/del/move row/column, etc.):
  var html = genControlsActionHtml()
  var controlEle = addEle(controlsEle, html, 'span')
  controlEle.className = 'actions'

  // Insert 'Upload'-wrapper:
  controlEle = addEle(controlsEle, '', 'span')
  controlEle.style = 'position: relative; top: 0; left: 0; display: none;'
  // Insert 'Upload'-button:
  addEle(controlEle, 'Upload', 'span')
  // Insert 'Browse'-button:
  controlEle = provideFileUpload(controlEle, doAfterFileUpload)
  // Hide 'Browse', leave 'Upload' visible:
  controlEle.style = '\
    position: absolute;\
    top: 0;\
    left: 0;\
    height: 1.5em;\
    width: 5em;\
    margin: 0;\
    padding: 0;\
    font-size: 20px;\
    cursor: pointer;\
    opacity: 0;\
    filter: alpha(opacity=0);'
}
function doAfterFileUpload(csv) {
  addTable(getKey(), csv)
}
function genControlsActionHtml() {
  //var html = 'Actions: <select class="action">' +
  var html = '<select class="action">' +
    '<option>add</option>' +
    '<option>del</option>' +
    '<option>move</option>' +
    '<option>import</option>' +
  '</select>' +
  '<select class="what">' +
    '<option>Row</option>' +
    '<option>Column</option>' +
    '<option>Table</option>' +
  '</select>' +
  '<input class="positions" value="1">' +
  '<span class="targetPosition" style="display: none;"> to position ' +
  '<input value="2">' +
  '</span>'
  return html
}
function listenControlsAction(controlsEle) {
  var actionEle = controlsEle.getElementsByClassName('action')[0]
  var importEle = controlsEle.parentNode.children[controlsEle.parentNode.children.length-1]
  var positionsEle = controlsEle.getElementsByClassName('positions')[0]
  var whatEle = controlsEle.getElementsByClassName('what')[0]
  var tableKey = null
  var targetPositionEle = controlsEle.getElementsByClassName('targetPosition')[0]
  actionEle.onkeyup = function(eve) {
    var options = whatEle.getElementsByTagName('option')
    if(eve.target.value == 'move') {
      targetPositionEle.style.display = 'inline'
      for(var i=0; i < options.length; i++) {
        if(options[i].value == 'Table') {
          options[i].remove()
        }
      }
    }
    else if(eve.target.value == 'import') {
      importEle.style.display = 'inline'
    }
    else {
      targetPositionEle.style.display = 'none'
      var hasOptionTable = false
      for(var i=0; i < options.length; i++) {
        if(options[i].value == 'Table') {
          hasOptionTable = true
        }
      }
      if(! hasOptionTable) {
        var optionEle = document.createElement('option')
        optionEle.innerHTML = 'Table'
        whatEle.appendChild(optionEle)
      }
    }
  }
  controlsEle.onkeyup = function(eve) {
    if(eve.keyCode == 13) { // is enter-key
      var tableKey = getKey()
      var args = [getKey()]
      var action = actionEle.value
      var what = whatEle.value
      var positions = positionsEle.value
      var funcName = action + what
      // Fail silently when existing table wants to be added or non-existing
      // table is supposed to be deleted:
      if( ! (what == 'Table' && ( action == 'add' && keyExists(positions) )
                             || ( action == 'delete' && ! keyExists(positions) )
            )
        ) {
                if(funcName == 'addRow')  addRow(tableKey, positions)
        else if(funcName == 'addColumn')  addColumn(tableKey, positions)
        else if(funcName == 'addTable')   addTable(positions)
        else if(funcName == 'delRow')     delRow(tableKey, positions)
        else if(funcName == 'delColumn')  delColumn(tableKey, positions)
        else if(funcName == 'delTable')   delTable(positions)
        else if(funcName == 'moveRow')    moveRow(tableKey, positions, targetPosition)
        else if(funcName == 'moveColumn') moveColumn(tableKey, positions, targetPosition)
      }
    } // is enter-key
  } // a key is pressed
} // listenControlsAction
