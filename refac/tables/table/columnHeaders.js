function addColumnHeadersPerRow(table) {
// Show column-header above any cell.
  var style = window.getComputedStyle(table.ele.children[0].children[0])
  var col = style.getPropertyValue('color')
  var bgCol = style.getPropertyValue('background-color')
  style = `
    li:before {
      background: black;
      color: white;
      display: block;
    }
  `

  var headers = localStorage.getItem(table.id).split(rowSeparator)[0].split(cellSeparator)
  var rowEles = table.ele.children
  var rowEle = rowEles[0]
  var cellEles = rowEle.children

  for(var j=0; j < cellEles.length; j++) {

    var header = headers[j]

    if(header == '') header = '[Empty Header]'

    var number = Number(j) + 1

    style += `ul:not(:first-child) li:nth-child(${number}):before {
      content: "${header}";
      display: block;
    }`
  }


  var styleEle = addEle(document.head, style, 'style')
}
