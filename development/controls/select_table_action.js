function addSelectTableActionEles(parentEle) {
  parentEle = addEle(parentEle, null, 'span')
  parentEle.className = 'selectTableAction'
  var actionOptions = ['add', 'del', 'move', 'import', 'sort']
  var actionEle = addSelectEle(parentEle, actionOptions)
  var whatOptions = ['Row', 'Column', 'SumColumn', 'Table']
  var whatEle = addSelectEle(parentEle, whatOptions)
  var startNrEle = addEle(parentEle, null, 'input')
  var targetNrEle = addEle(parentEle, null, 'input')
  var importEle = addCustomUploadButton(parentEle)
  
  // Set options of follwoing fields depending on value of preceding fields:
  addDependentFieldAction(actionEle, whatEle, 'add', whatOptions)
  whatOptions = ['Row', 'Column', 'Table']
  addDependentFieldAction(actionEle, whatEle, 'del', whatOptions)
  whatOptions = ['Row', 'Column']
  addDependentFieldAction(actionEle, whatEle, 'move', whatOptions)
  addDependentFieldAction(actionEle, whatEle, 'import', ['Table'])
  addDependentFieldAction(actionEle, whatEle, 'sort', ['Column'])
  // Hide importEle for all actions, but action 'import':
  for(var i=0; i < actionOptions[i].length; i++) {
    addDependentFieldAction(actionEle, importEle, actionOptions[i], hideEle)
  }
  addDependentFieldAction(actionEle, importEle, 'import', showEle)
  // Hide targetNrEle for all actions, but action 'move':
  for(var i=0; i < actionOptions[i].length; i++) {
    addDependentFieldAction(actionEle, targetNrEle, actionOptions[i], hideEle)
  }
  addDependentFieldAction(actionEle, targetNrEle, 'move', showEle)

  listenSelectTableActionEles(parentEle)
}
function addCustomUploadButton(parentEle) {
  // Insert 'Upload'-wrapper:
  var ele = addEle(parentEle, '', 'span')
  var wrapper = ele
  ele.style = 'position: relative; top: 0; left: 0; display: none;'
  // Insert 'Upload'-button:
  addEle(ele, 'Upload', 'span')
  // Insert 'Browse'-button:
  ele = addUploadButton(ele, doAfterFileUpload)
  // Hide 'Browse', leave 'Upload' visible:
  ele.style = '\
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

  return wrapper
}
function doAfterFileUpload(csv) {
  addTable(getTableId(), csv)
}
function getAction(parentEle) {
  var tableId = getTableId()
  var values = []
  for(var i=0; i < parentEle.children.length; i++) {
    var value = parentEle.children[i].value
    values.push(value)
  }
  var actionName = values[0] + values[1]
  var startNr = values[2] - 1
  var targetNr = values[3] - 1
       console.debug(actionName,startNr,targetNr)
       if(actionName == 'addRow')      addRow(tableId, startNr)
  else if(actionName == 'delRow')      delRow(tableId, startNr)
  else if(actionName == 'moveRow')     moveRow(tableId, startNr, targetNr)
  else if(actionName == 'addColumn')   addColumn(tableId, startNr)
  else if(actionName == 'delColumn')   delColumn(tableId, startNr)
  else if(actionName == 'moveColumn')  moveColumn(tableId, startNr, targetNr)
  else if(actionName == 'sortColumn')  sortColumnByDate(tableId, startNr)
  else if(actionName == 'addTable')    addTable(values[2])
  else if(actionName == 'delTable')    delTable(values[2])
  else if(actionName == 'importTable') parentEle.children[parentEle.children.length-1].children[1].focus()
  else console.debug(`Action-name "${actionName}" is an unknown case, nothing changes.`)
}
function listenSelectTableActionEles(parentEle) {
  parentEle.onkeydown = function(eve) {
    if(eve.keyCode == 13) {
      var action = getAction(parentEle)
    }
  }
}

