function addControlsStyle(controlsSelector) {
  var selector = controlsSelector
  var style = `
    border: 1px solid;
    margin: 1em 0;
    padding: 1em 0;
  `
  styleToSheet.addRule(selector, style)

  selector += 'input'
  style = 'width: 3em;'
  styleToSheet.addRule(selector, style)
}
