function Table(id) {
  this.id = id
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
    addSumRowEveryNDays(this.id)
  }
  this.addTable = function(tableId) {
    table = new Table(tableId)
    addTable(tableId)
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
}
