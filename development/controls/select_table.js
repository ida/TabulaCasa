function addSelectTableEle(controlsEle) {
  var html = genTablesSelectionHtml()
  var controlEle = addEle(controlsEle, html, 'span')
  controlEle.className = 'tablesSelection'
}
function genTablesSelectionHtml(key=null) {
  //var html = 'Table: <select>'
  var html = '<select>'
  var keys = getTableIds()
  for(var i=0; i < keys.length; i++) {
    html += '<option'
    if( (key === null && i==0) || (key !== null && keys[i] == key) ) {
      html += ' selected'
    }
    html += '>' + keys[i] + '</option>'
  }
  html += '</select>'
  return html
}
function listenTablesSelection(tablesSelectionEle) {
  var tablesSelectEle = tablesSelectionEle.children[0]
  tablesSelectEle.onchange = function(eve) {
    for(var i=0; i < eve.target.children.length; i++) {
      if(eve.target.children[i].selected === true) {
        showTableOnly(eve.target.children[i].value)
      }
    }
  }
}
function updateTablesSelection(key) {
  var tablesSelectionEle = getComponentEle(getAppEle(), 'tablesSelection')
  tablesSelectionEle.innerHTML = genTablesSelectionHtml(key)
  listenTablesSelection(tablesSelectionEle)
}
