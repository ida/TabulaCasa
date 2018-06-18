function Tables(viewParentEle, controlParentEle=viewParentEle) {


  var model = {
    table: null,
    tableIds: null,
    tables: [],
    ini: function() {
      this.tableIds = getTableIds()
      for(var i=0; i < this.tableIds.length; i++) {
        var table = new Tabla(this.tableIds[i], viewParentEle)
        this.tables.push(table)
      }
      this.table = this.tables[0]
    },
    setTableById: function(tableId) {
      for(var i=0; i < this.tables.length; i++) {
        if(tableId == this.tables[i].id) {
          this.table = this.tables[i]
        }
      }
    },


  }


  var view = {
    ele: addEle(viewParentEle),
    render: function() {
      model.table.view.render()
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
        model.table = this.setTableById(eve.target.value)
        table.view.render()
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
