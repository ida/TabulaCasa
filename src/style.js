function addStylesheet() {

  // Add style for app-ele:
  var selector = '.' + appName
  var style = 'background: lightblue;'
  addStyle(selector, style)

  genStyleTable('.' + appName)
}
