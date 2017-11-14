function genStyleTable(prefix, showNrs=true) {
  var tableTagName = 'div'
  var rowTagName = 'ul'
  var cellTagName = 'li'

  var tableSelector = prefix + ' .tables > ' + tableTagName
  var rowSelector = tableSelector + ' > ' + rowTagName
  var cellSelector = rowSelector + ' > ' + cellTagName

  var background = '#000'
  var borderWidth = '0.1em'
  var border = borderWidth + ' solid'
  var color = '#fff'
  var cellWidth = '13em'
  var lineHeight = '1.75em'
  var padding = '0.25em'
/*
 *
 *  Prep styles:
 *
 */
  var cellBorder = `
  border-left: ` + border + `;
  border-top: ` + border + `;
`
  var cellWidthAndHeight = '\
  width: ' + cellWidth + ';\n\
  height: ' + lineHeight + ';\n\
'
  var cellInputStyle = `
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
`
  var cellStyleBase = cellInputStyle + 'margin: 0; padding: ' + padding + ';'
  var cellStyle = cellStyleBase + cellWidthAndHeight
  var cellOverflowStyle = `
  overflow: visible;
  background: inherit;
  width: auto;
  min-width: ` + cellWidth + ';'
/*
 *
 *  Set styles:
 *
 */
  var selector = tableSelector
  var style = `
  border-right: 1px solid;
  border-bottom: 1px solid;
  line-height: ` + lineHeight + ';'
  addStyle(selector, style)

  selector = rowSelector
  style = 'white-space: nowrap; margin: 0; padding: 0;'
  addStyle(selector, style)

  selector = cellSelector
  style = cellStyle + cellBorder
  addStyle(selector, style)

  selector = cellSelector + ':focus'
  style = cellOverflowStyle
  addStyle(selector, style)

  selector = cellSelector + ':hover'
  style = cellOverflowStyle
  addStyle(selector, style)

  selector = cellSelector + ' input'
  style = 'background: inherit;\n\
  border: none;\n\
  color: inherit;\n\
  font: inherit;\n\
  margin: 0;\n\
  padding: 0;\n'
  addStyle(selector, style)
/*
 *
 * NUMBERING
 *
 */
  if(showNrs) {
  var colFirstCellSelector = rowSelector + 
                             ':first-child > ' +
                             cellTagName

  var colNrParentStyle = `
  position: relative;
  top: 0;
  left: 0;
  overflow: visible;
`
  var colNrPosTop = parseFloat(lineHeight) +
                    2* parseFloat(padding) +
                    2* parseFloat(borderWidth) + 'em'
  var colNrPosLeft = parseFloat(borderWidth) + 'em'
  var colNrStyle = '\
  ' + cellStyle + '\
  ' + cellBorder + '\
  position: absolute;\n\
  top: -' + colNrPosTop + ';\n\
  left: -' + colNrPosLeft + ';\n\
  '

  var rowNrStyle = '\
  ' + cellStyleBase + '\
  ' + cellBorder + '\
  text-align: right;\n\
  min-width: 1.75em;\n\
  ' // rowNrStyle

  style = '\
' + tableSelector + ' {\n\
  counter-reset: rowscounter;\n\
}\n\
/* TABLE-ID: */\n\
' + tableSelector + ':before {\n\
  content: attr(id);\n\
  ' + rowNrStyle + '\
}\n\
' + rowSelector + ':before {\n\
  counter-increment: rowscounter;\n\
  content: counter(rowscounter);\n\
  counter-reset: columnscounter;\n\
  ' + rowNrStyle + '\
}\n\
/* COL-NRS: */\n\
' + tableSelector + ' > *:first-child > * {\n\
  ' + colNrParentStyle + '\
}\n\
' + colFirstCellSelector + ':before {\n\
  counter-increment: columnscounter;\n\
  content: counter(columnscounter);\n\
  ' + colNrStyle + '\
}\n\
' // style
  addStyles(style)
  } // showNrs
}
