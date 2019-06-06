function Configuration(parentEle=null) {
  this.config = {
    defaultCells: [3, 3], // columns- and rows-amount for freshly added tables, is nullable
    useHeaderCells: true, // whether or not the first cells are supposed to be header-cells
  }
  if(parentEle) this.addEle(parentEle)
}
Configuration.prototype.addEle = function(parentEle) {
  var lockSymbol = '&#x1f512;'
  var gearWheelSymbol = '&#x2699;'
  var configEle = addEle(parentEle, gearWheelSymbol, 'button')
  configEle.onclick = function() {
    alert('The config-button has not been implemented, yet.')
  }
}
Configuration.prototype.getProp = function(propName) {
  return this.config[propName]
}
Configuration.prototype.getProps = function(propName) {
  return this.config
}
Configuration.prototype.setProp = function(propName, propValue=null) {
  var err = 'Configuration.setProp says "' + propName +
  '" is invalid. Omitting to set it, nothing changed.'
  if( ! this.config[propName]) throw new Error(err)
  else this.config[propName] = propValue
}
