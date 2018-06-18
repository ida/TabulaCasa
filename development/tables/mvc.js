function Tables(viewParentEle, controlParentEle=viewParentEle) {


  var model = {
    table: null,
    tableIds: null,
    tables: [],
    ini: function() {
      this.tableIds = getTableIds()
      for(var i=0; i < this.tableIds.length; i++) {
        var table = new Tabla(this.tableIds[i], view.ele)
        this.tables.push(table)
      }
      this.table = this.tables[0]
    },
    setTableById: function(tableId, updateView=true) {
      for(var i=0; i < this.tables.length; i++) {
          console.debug(this.tables[i])
        if(tableId == this.tables[i].model.id) {
          console.debug(tableId)
          this.table = this.tables[i]
          break
        }
      }
      if(updateView === true) view.render()
    },


  }


  var view = {
    ele: addEle(viewParentEle),
    render: function() {
      this.showTableOnly()
    },
    showTableOnly: function() {
      console.debug('showTableOnly')
console.debug(model.table.view)

      for(var i=0; i < model.tables.length; i++) {
        model.tables[i].view.hide()
      }
      model.table.view.show()
    },
    ini: function() {
      this.ele.className = 'tables'
      this.render()
    },
  }


  var control = {

    ele: addSelectEle(controlParentEle),


    render: function() {
      addOptionEles(this.ele, model.tableIds)
    },

    listen: function() {
      this.ele.onchange = function(eve) {
        model.setTableById(eve.target.value)
      }
    },

    ini: function() {
      this.render()
      this.listen()
      this.ele.focus()
    },
  }


  model.ini()
  view.ini()
  control.ini()

}
