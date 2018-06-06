function addSelectTableActionEles(parentEle) {

  parentEle = addEle(parentEle, null, 'span')
  parentEle.className = 'selectTableAction'

  var actionOptions = ['add', 'del', 'move', 'import', 'sort']
  var actionEle = addSelectEle(parentEle, actionOptions)
  var whatOptions = ['Row', 'Column', 'SumColumn', 'SumRow', 'Table', 'SumRowPerMonth', 'SumRowPerWeek']
  var whatEle = addSelectEle(parentEle, whatOptions)
  var startNrEle = addEle(parentEle, null, 'input')
  var targetNrEle = addEle(parentEle, null, 'input')
  var importEle = addCustomUploadButton(parentEle)
 
  // Set options of following fields depending on value of preceding fields:
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

  // When import was chosen...
  addDependentFieldAction(actionEle, importEle, 'import', function(dependentEle) {
    // ... insert current table-id into startNr-input and set focus on it:
    startNrEle.value = table.id; startNrEle.focus()
  });

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
function doAfterFileUpload(csv, displayTable=true) {
  setTable(table.id, csv, displayTable)
}
function callSelectedTableAction(args) {
  args = modulateTableActionArgs(args)
  if(table === undefined) {
    addTable(args[2]) // also sets var 'table'
    // Remove text-node "There are no tables, yet":
    table.ele.parentNode.firstChild.remove()
  }
  else table[args.shift() + args.shift()](...args)
}
function getActionValues(actionsEle) {
  var args = []
  for(var i=0; i < actionsEle.children.length; i++) {
    args.push(actionsEle.children[i].value)
  }
  return args
}
function listenSelectTableActionEles(parentEle) {
  parentEle.onkeydown = function(eve) {
    if(eve.keyCode == 13) { // is enter/return-key
      var args = getActionValues(parentEle)
      if(validateTableActionArgs(args) === true) callSelectedTableAction(args)
    }
  }
}
function modulateTableActionArgs(args) {
  var startNr = args[2]

  if(args[1] != 'Table') {

    if(isNumber(startNr) === false) {

      // Default to last pos:
      if(args[1].indexOf('Row') != -1) {
        startNr = getLastRowPos(table.id)
      }
      else if(args[1].indexOf('Column') != -1) {
        startNr = getLastColumnPos(table.id)
      }

      startNr = Number(startNr)

      // For add-actions default to one more than last pos:
      if(args[0] == 'add') startNr += 1
    }
    // Transform entered human-number to list-position:
    startNr -= 1

    args[2] = startNr
  }
  return args
}
function validateTableActionArgs(args) {
  if(args[1] == 'Table') {
    var tableId = args[2]
    if(tableId == '') {
      addInfo('Please enter a name for the table.')
      return false
    }
    else if(tableIdExists(tableId) && args[0] == 'add') {
      addInfo('A table named "' + args[2] + '" exists already.')
      return false
    }
    return true
  }
  return true
}

