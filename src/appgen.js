// Generic helper-funcs which could be re-used for other projects.
function addEle(parentEle, html=null, tagName='div') {
  var ele = document.createElement(tagName)
  if(html) { ele.innerHTML = html }
  parentEle.appendChild(ele)
  return ele
}
function addStyle(newSelector, newStyle) {
  // Example:
  // addStyle('div > h1', 'background: red; color: green;')
  var ruleChanged = false
  var rules = getRules(getStyles())
  for(var i in rules) {
    var rule = rules[i]
    var selector = rule.split('{')[0].trim()
    var style = rule.split('{')[1].trim()
    var props = getProps(style)
    var newProps = getProps(newStyle)
    // selector exists already:
    if(selector == newSelector) {
      for(var key in newProps) {
        // prop exists already:
        if(props[key] !== undefined) {
          // old val differs new val:
          if(props[key] != newProps[key]) {
            // set new val:
            props[key] = newProps[key]
            ruleChanged = true
          }
        } // prop does not exist already:
        else { 
          // set prop and val:
          props[key] = newProps[key]
          ruleChanged = true
        }
      } // each newProp
    } // selector exists
    if(ruleChanged) { // set changed rule in rules:
      style = ''
      for(var key in props) {
        style += key + ': ' + props[key] + ';\n'
      }
      rules[i] = selector + '{\n' + style
      break
    }
  } // each rule
  if(ruleChanged) { // rule exists and changed, set new styles:
      setStyles(rules)
  }
  else { // rule doesn't exist, append to styles:
    getStyleEle().innerHTML += newSelector + ' {\n' + newStyle + '}\n'
  }
}
function addStyles(string) {
  getStyleEle().innerHTML += string
}
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
function getProps(style) {
  style = style.split(';')
  style.pop() // last item is an empty str, remove it
  props = {}
  for(var i in style) {
    var styl = style[i].trim()
    var propValPair = styl.split(':')
    var prop = propValPair[0].trim()
    var val = propValPair[1].trim()
    props[prop] = val
  }
  return props
}
function getRules(style) {
  // Return rules of stylesheet as a list.
  var rules = style.split('}')
  rules.pop() // last item is an empty str, remove it
  return rules
}
function getStyle(selector) {
  var style = null
  var styles = getStyles()
  var rules = getRules(styles)
  for(var i in rules) {
    var rule = rules[i].trim()
    var selectors = rule.split('{')[0].split(',')
    for(var j in selectors) {
      if(selectors[j].trim() == selector) {
        style = rule.split('{')[1]
      }
    }
  }
  return style
}
function getStyleEle() {
  // The styleEle is assumed to be the only ele within the head-ele
  // which carries the appName plus 'Styles' as className.
  var ele = document.getElementsByTagName('head')[0]
  ele = ele.getElementsByClassName(appName + 'Styles')[0]
  if(ele) return ele
}
function getStyles() {
  var ele = getStyleEle()
  return ele.innerHTML
}
function setStyles(rules) {
  var styles = ''
  for(var i in rules) {
    var rule = rules[i]
    styles += rule + '\n}'
  }
  getStyleEle().innerHTML = styles
}
