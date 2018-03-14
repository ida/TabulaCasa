function getCellPos(cellEle) {
  return getChildPos(cellEle)
}
function getChildPos(ele) {
  var pos = 0
  while(ele.previousSibling !== null) {
    if(ele.previousSibling === null ||
       ele.previousSibling.tagName.toLowerCase() == 'div') {
      break
    }
    ele = ele.previousSibling
    pos += 1
  }
  return pos
}
function getRowPos(cellEle) {
  return getChildPos(cellEle.parentNode)
}
function insertInput(cell) {
  cell.innerHTML = '<input value="' + cell.innerHTML + '">'
  var input = cell.getElementsByTagName('input')[0]
  input.focus()
  listenInput(input)
}
function listenInput(input) {
  // Input looses focus, reset cell-html with val:
  input.onblur = function(eve) {
    input.parentNode.innerHTML = input.value
  }
}
function listenCells(tableEle) {
  // We assume every list-item within a table is a cell:
  var cells = tableEle.getElementsByTagName('li')
  for(var i=0; i < cells.length; i++) {
    // When user clicks into a cell:
    cells[i].onclick = function(eve) {
      insertInput(eve.target)
    }
    // When user types something into input:
    cells[i].onkeydown = function(eve) {
      // In case it's an arrow-key:
      if(eve.keyCode == '37'
      || eve.keyCode == '38'
      || eve.keyCode == '39'
      || eve.keyCode == '40') {
        handleArrowKey(eve)
      }
    }
    // When user has typed something into input:
    cells[i].onkeyup = function(eve) {
      // Write the new val into localStorage,
      // for that we need table-key, row-pos and cell-pos:
      var cellPos = getCellPos(eve.target.parentNode)
      var rowPos = getRowPos(eve.target.parentNode)
      var key = getKey()
      setCell(key, rowPos, cellPos, eve.target.value)
    }
    // When a cell gains focus:
    cells[i].onfocus = function(eve) {
      // Simulate click in it:
      eve.target.click()
    }
  }
}
