// ELEMENTS

function addEle(parentEle, html=null, tagName='div') {
  var ele = document.createElement(tagName)
  if(html) { ele.innerHTML = html }
  parentEle.appendChild(ele)
  return ele
}
function hideEle(ele) {
  ele.style.display = 'none'
}
function showEle(ele) {
  ele.style.display = 'inline-block'
}

// USER-MESSAGE

function addInfo(msg) {
  var parentEle = table.ele.parentNode.parentNode
  var msgEle = addEle(parentEle, msg)
  parentEle.insertBefore(msgEle, parentEle.firstChild)
  msgEle.style.position = 'absolute'
  var closeMsgEle = addEle(msgEle, 'x', 'span')
  closeMsgEle.tabIndex = 0
  closeMsgEle.onclick = function() msgEle.remove()
  closeMsgEle.onkeydown = function(eve) { if(eve.keyCode == 13) eve.target.click() }
  setTimeout(function() { closeMsgEle.click() }, 10000)
}

// POSITIONS

function dataRowPosToVisualRowPos(rowPos) {
// If rowEle does not have visual class, it's a data-row:
//   Subtract 1 of rowPos until it's 0 and return rowElePos
  var tableEle = document.getElementById(table.id)
  var rowEles = tableEle.children
  for(var i=0; i < rowEles.length; i++) {
    var rowEle = rowEles[i]
    if(rowEle.className.indexOf('sum') < 0) {
      rowPos -= 1
    }
    if(rowPos == 0) {
      return i+1
    }
  }
  return null
}
