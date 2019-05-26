function addControlsStyle(controlsSelector) {
  var selector = controlsSelector
  var style = `
    padding: 1em 0;
    position: fixed;
    top: 0;
    left: 0;
    height: 1.5em;
    background: black;
    width: 100%;
  `
  styleToSheet.addRule(selector, style)

  selector += 'input'
  style = 'width: 3em;'
  styleToSheet.addRule(selector, style)

}
