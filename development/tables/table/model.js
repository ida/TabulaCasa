function Table(id, parentEle) {
  this.id = id
  this.ele = null
  this.addColumn = function(columnPos) {
    addColumn(this.id, columnPos)
  }
  this.addRow = function(rowPos) {
    addRow(this.id, rowPos)
  }
  this.addSumColumn = function(columnPos) {
    addSumColumn(this.id, columnPos)
  }
  this.addSumRow = function(rowPos) {
    addSumRow(this.id, rowPos)
  }
  this.addSumRowPerMonth = function() {
    addSumRowEveryNMonths(this.id)
  }
  this.addSumRowPerWeek = function() {
    addSumRowPerWeek(this.id)
  }
  this.addTable = function(tableId) {
    addTable(tableId)
  }
  this.cloneTable = function(sourceTableId, targetTableId) {
    cloneTable(sourceTableId, targetTableId)
  }
  this.delColumn = function(columnPos) {
    delColumn(this.id, columnPos)
  }
  this.delRow = function(rowPos) {
    delRow(this.id, rowPos)
  }
  this.delTable = function(tableId) {
    delTable(tableId)
  }
  this.moveColumn = function(columnPos, targetPos) {
    moveColumn(this.id, columnPos, targetPos)
  }
  this.moveRow = function(rowPos, targetPos) {
    moveRow(this.id, rowPos, targetPos)
  }
  this.importTable = function(tableId) {
    importTable(this.id, tableId)
  }
  this.sortColumn = function(columnPos) {
    sortColumnByDate(this.id, columnPos)
  }
  this.ini(parentEle)
}
Table.prototype.ini = function(parentEle) {
  this.ele = addEle(parentEle)
  this.ele.id = this.id
}
