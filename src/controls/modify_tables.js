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
  // In case imported CSV uses other delimiters than
  // this app, convert CSV to fit app, using Papa:
//  csv = Papa.parse(csv)
//  csv = Papa.unparse(csv)
  addTable(getKey(), csv)
}
function genControlsActionHtml() {
  //var html = 'Actions: <select class="action">' +
  var html = '<select class="action">' +
    '<option>add</option>' +
    '<option>del</option>' +
    '<option>move</option>' +
    '<option>import</option>' +
    '<option>sort</option>' +
  '</select>' +
  '<select class="what">' +
    '<option>Row</option>' +
    '<option>Column</option>' +
    '<option>Table</option>' +
    '<option>SumColumn</option>' +
  '</select>' +
  '<input class="positions" value="1">' +
  '<span class="targetPosition" style="display: none;"> to nr. ' +
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
  var targetPositionInput = targetPositionEle.children[0]
  // Execute choosen action when return-/enter-key was pressed:
  controlsEle.onkeyup = function(eve) {
    if(eve.keyCode == 13) { // is return-/enter-key
      var tableKey = getKey()
      var args = [getKey()]
      var action = actionEle.value
      var what = whatEle.value
      var positions = positionsEle.value
      var targetPosition = targetPositionInput.value
      var funcName = action + what
      // Fail silently when existing table wants to be added or non-existing
      // table is supposed to be deleted:
      if( ! (what == 'Table' && ( action == 'add' && keyExists(positions) )
                             || ( action == 'delete' && ! keyExists(positions) )
            )
        ) {
             if(funcName ==         'addRow') addRow(tableKey, positions-1)
        else if(funcName ==      'addColumn') addColumn(tableKey, positions-1)
        else if(funcName ==   'addSumColumn') addSumColumn(positions-1)
        else if(funcName ==       'addTable') addTable(positions)
        else if(funcName ==         'delRow') delRow(tableKey, positions-1)
        else if(funcName ==      'delColumn') delColumn(tableKey, positions-1)
        else if(funcName ==   'delSumColumn') delSumColumn()
        else if(funcName ==       'delTable') delTable(positions)
        else if(funcName ==        'moveRow') moveRow(tableKey, positions-1, targetPosition-1)
        else if(funcName ==     'moveColumn') moveColumn(tableKey, positions-1, targetPosition-1)
        else if(funcName ==     'sortColumn') sortColumnByDate(positions-1)
        else console.info('The selection "' + funcName + '" is not wired to' +
                          ' a function, we ignore that for now, nothing changed.')
      }
    } // is enter-key
  } // a key is pressed
  actionEle.onclick = function(eve) { onSelectionChange(eve, whatEle, targetPositionEle, importEle) }
  actionEle.onkeyup = function(eve) { onSelectionChange(eve, whatEle, targetPositionEle, importEle) }
} // listenControlsAction
function onSelectionChange(eve, whatEle, targetPositionEle, importEle) {
// Show and hide control-eles depending on the choosen options:
  var options = whatEle.getElementsByTagName('option')
  // If 'move' was choosen:
  if(eve.target.value == 'move') {
    // Hide upload-button:
    importEle.style.display = 'none'
    // Show targetPosition-input-field:
    targetPositionEle.style.display = 'inline'
    for(var i=0; i < options.length; i++) {
      // Remove 'Table' from what-options:
      if(options[i].value == 'Table') {
        options[i].remove()
      }
    }
  }
  else {
    // Hide the targetPosition-field:
    targetPositionEle.style.display = 'none'
    // Hide upload-button:
    importEle.style.display = 'none'
    // If 'Table' is not available in options, add it:
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
  // If 'import' was choosen:
  if(eve.target.value == 'import') {
    // Hide targetPosition:
    targetPositionEle.style.display = 'none'
    // Show upload-button:
    importEle.style.display = 'inline'
    // Select 'Table' as what-option:
    for(var i=0; i < options.length; i++) {
      if(options[i].value == 'Table') {
        options[i].setAttribute('selected', 'selected')
      }
    }
  }
} // onSelectionChange

