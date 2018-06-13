function addApp(appEle) {
  styleToSheet.prefix = '.' + appName + ' '
  if(appEle===null) appEle = document.body
  appEle.className = appName
  return appEle
}
/*
 *
 * Getter-conventions
 *
 */
function getAppEle() {
  // App-ele is assumed to carry the glob-var appName as
  // className and is the only ele with this class in the
  // doc.
  return document.getElementsByClassName(appName)[0]
}
function getComponentEle(appEle, componentName) {
  // A component-ele is assumed to live within the app-ele
  // and is the only ele within the app-ele with the
  // componentName as className.
  return appEle.getElementsByClassName(componentName)[0]
}
