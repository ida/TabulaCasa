var styleToSheet = {
/*


What
----

Dynamically style in Javascript during development,
then export the generated styles as a static stylesheet.


Usage
-----


Currently realized:

  styleToSheet.addRule('div a', 'padding: 0; color: green;')

  styleToSheet.showStyles()


TODO:
  styleToSheet.delProp('div a', 'padding')
  
  styleToSheet.delRule('div a')

  styleToSheet.delRules()

  styleToSheet.download()



Why
---

1.) Share script-variables with stylesheets, because we can
    then set a className on an ele and use it furtheron as
    a selector for the styling, and bind functions to eles
    with that className.

    Note: It is possible to share CSS-vars with scripts, but
    then again a script needs to know the property-name of
    the css-var.


2.) Do everything in Javascript, no CSS-prepocessors like
    LESS or SASS, so one doesn't need to know about yet
    another tool, which saves time.

3.) Have a programmatical way to write CSS, as human-written
    CSS is prone to inconsistencies, such as rules which are
    declared several times or properties which are declared
    several times within a rule. Won't happen with this tool.


How
---

Contain a rules-object and modification-functions for it.
Insert rules into stylesheet in head-ele on any modification.
Provide function for downloading stylesheet.



Variable names and structures
-----------------------------

  selector     = 'body > div'

  style        = 'background: red; color: green;'

  styles        = 'div a {background: red; } body a { color: green; }'

  props        = { background: 'red', color: 'green', } 

  rule         = [selector, props]


*/


  rules: [],         // know the rules before you break them
  selectors: [],    //  needed for quick-comparison in selectorExists()
  styleEle: null,  //   output rules on any changement in this ele

  addRule: function(selector, style) {

    // Initially add style-ele when first rule is added:
    if( ! this.styleEle ) this.addStyleEle()


    // Compare and update rules:
    var props = this.getProps(style)

    // Selector exists:
    if(this.selectorExists(selector) ) {
      for(var i in this.rules) {
        var rule =   this.rules[i]
        var ruleProps =    rule[1]
        var ruleSelector = rule[0]

        // Rule has same selector than passed one:
        if(selector == ruleSelector) {
          for(var propName in props) {
            var propVal = props[propName]

            // Prop-val differs:
            if(ruleProps[propName] != propVal) {
              // Set new val:
              rule[1][propName] = propVal
            }
          }
        }
      }
    }
    // Selector does not exist:
    else {
      // Add new rule:
      this.rules.push([selector, props])
      // Collect selector:
      this.selectors.push(selector)
    }
    
    
    // Set new rules:
    this.setStyles()
    
    
  },


  addStyleEle: function() {
    var parentEle = document.getElementsByTagName('head')[0]
    var ele = document.createElement('style')
    parentEle.appendChild(ele)
    this.styleEle = ele
  },


  getProps: function(style) {
    style = style.split(';')
    var props = {}
    for(var i in style) {
      var pair = style[i].split(':')
      if(pair != '') {
        var prop = pair[0].trim()
        if(prop != '') {
          var val  = pair[1].trim()
          props[prop] = val
        }
      }
    }
    return props
  },


  getRules: function() {
    var rules = getStyles().split('}')
    return rules
  },


  getStyles: function() {
    return this.styleEle.innerHTML
  },


  selectorExists: function(selector) {
    for(var i in this.selectors) {
      if(this.selectors[i] == selector) {
        return true
      }
    }
    return false
  },


  setStyles: function() {

    var styles = ''

    for(var i in this.rules) {

      var rule     = this.rules[i]
      var selector = rule[0]
      var props    = rule[1]

      styles += selector + ' {\n'

      for(var name in props) {
        styles += '  '
        styles += name
        styles += ': '
        styles += props[name]
        styles += ';\n'
      }
      styles += '}\n'
    }
    this.styleEle.innerHTML = styles
  },


  showStyles: function() {
    var html = ''
    var styles = this.getStyles().split('\n')
    for(var i in styles) {
      html += styles[i] + '<br>'
    }
    document.body.innerHTML = html
  },


} // EO styleToSheet
