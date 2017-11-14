function addStylesheet() {
  // Add style-ele:
  var styleEle = addEle(document.getElementsByTagName('head')[0], '', 'style')
  styleEle.className = appName + 'Styles'

  // Add style for app-ele:
  var selector = '.' + appName
  var style = 'background: lightblue;'
  addStyle(selector, style)

  genStyleTable('.' + appName)
}
