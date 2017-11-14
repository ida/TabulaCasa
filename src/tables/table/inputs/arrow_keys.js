function cursorIsAtBeginning(input) {
  if(input.selectionStart == 0
    && input.selectionEnd == 0) {
    return true
  }
  else {
    return false
  }
}
function cursorIsAtEnd(input) {
  if(input.selectionStart == input.value.length
    && input.selectionEnd == input.value.length) {
    return true
  }
  else {
    return false
  }
}
function moveCursorToEnd(input) {
  input.selectionStart = input.value.length
  input.selectionEnd = input.value.length
}
function handleArrowKey(eve) {
  var input = eve.target
  var keyCode = eve.keyCode
  // Left-arrow:
  if(keyCode == '37' && cursorIsAtBeginning(input)
                     && input.parentNode.previousSibling != null) {
    eve.preventDefault() // surpress arrow-move before setting new focus
    input.parentNode.previousSibling.focus()
    moveCursorToEnd(document.activeElement)
  }
  // Right-arrow:
  else if(keyCode == '39' && cursorIsAtEnd(input)
                          && input.parentNode.nextSibling != null) {
    eve.preventDefault() // surpress arrow-move before setting new focus
    input.parentNode.nextSibling.focus()
  }
  else {
    var cellPos = getCellPos(input.parentNode)
    var rows = input.parentNode.parentNode.parentNode.getElementsByTagName('ul')
    var rowPos = getRowPos(input.parentNode)
    // Down-arrow:
    if(keyCode == '40' && rowPos != rows.length-1) {
      input.parentNode.parentNode.nextSibling.children[cellPos].focus()
    }
    // Up-arrow: 
    else if(keyCode == '38' && rowPos != 0) {
      input.parentNode.parentNode.previousSibling.children[cellPos].focus()
    }
  }
}
