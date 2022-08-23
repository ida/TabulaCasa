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
  // Input looses focus, reset cell-html with val (thereby "removes" input-ele):
  input.onblur = function(eve) {
    input.parentNode.innerHTML = input.value
  }
}
function listenCells(tableEle) {
  var cellValue;
  // We assume every list-item within a table is a cell:
  var cells = tableEle.getElementsByTagName('li')
  for(var i=0; i < cells.length; i++) {
    // When user clicks into a cell:
    cells[i].onclick = function(eve) {
      // And it does not contain an input-ele, yet (here: no children):
      if(eve.target.children.length < 1) {
        // Insert an input-ele:
        insertInput(eve.target)
      }
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
      else {
        cellValue = eve.target.value
      }
    }
    // When user has typed something into input:
    cells[i].onkeyup = function(eve) {
      // Write the new val into localStorage,
      // for that we need table-key, row-pos and cell-pos:
      var cellPos = getCellPos(eve.target.parentNode)
      var rowPos = getRowPos(eve.target.parentNode)
      if(cellValue != eve.target.value) {
        var key = tableEle.id
        setCell(key, rowPos, cellPos, eve.target.value)

        // If cell is part of a sum-column or -row, update sum-column or -row:
        function isSumColumnCell(tableId, rowPos, colPos) {
          var cellValue = getCell(tableId, 0, colPos+1)
          return cellValue == sumColHeaderString
        }
        if(isSumColumnCell(key, rowPos, cellPos)) {
          updateSumColumnEles(key, cellPos)
        }
      }
    }
    // When a cell gains focus:
    cells[i].onfocus = function(eve) {
      // Simulate click in it:
      eve.target.click()
    }
  }
}
