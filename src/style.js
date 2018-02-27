function addAppStyles() {
  var background = 'inherit'
  var color = 'inherit'

  var selector = ''
  var style = `
    background: ` + background  + `;
         color: ` + color       + `;
  `
  styleToSheet.addRule(selector, style)


  style += 'border: none;'
  selector = ' input'
  styleToSheet.addRule(selector, style)


  selector = ' select'
  // Remove browser-styled arrow-down of selection-dropdown:
  // Only for testing, not IE-compatible.
  style += `
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  `
  styleToSheet.addRule(selector, style)


  selector = ' .controls'
  style = `
    border: 1px solid;
    margin: 1em 0;
  `
  styleToSheet.addRule(selector, style)

}
