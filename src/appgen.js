var appName = 'tabulaCasa'

function addApp(appEle) {
  if(appEle===null) appEle = document.body
  appEle.className = appName
  return appEle
}
/*
 *
 * General helper-func
 *
 */
function addEle(parentEle, html=null, tagName='div') {
  var ele = document.createElement(tagName)
  if(html) { ele.innerHTML = html }
  parentEle.appendChild(ele)
  return ele
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
