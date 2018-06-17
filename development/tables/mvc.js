function Tables(viewParentEle, controlParentEle=viewParentEle) {


  var model = {
    table: null,
    tableIds: null,
    ini: function() {
      this.tableIds = getTableIds()
      for(var i=0; i < this.tableIds.length; i++) {
        var table = new Tabla(this.tableIds[i], viewParentEle)
        tables.push(table)
      }
      this.table = tables[0]
      console.debug(this.table)
    },
  }


  var view = {
    ele: addEle(viewParentEle),
    render: function() {
      table.ele.innerHTML = genTableHtml(table.id)
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
        model.table = getTableById(eve.target.value)
        view.render()
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
