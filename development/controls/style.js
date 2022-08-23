function addControlsStyle(controlsSelector) {
  var selector = controlsSelector
  var style = `
    padding: 1em 0;
    position: fixed;
    bottom: 0;
    left: 0;
    background: black;
    color: white;
    width: 100%;
  `
  styleToSheet.addRule(selector, style)

  selector += 'input'
  style = 'width: 3em;'
  styleToSheet.addRule(selector, style)

}
