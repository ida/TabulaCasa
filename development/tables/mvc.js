function Tables(viewParentEle, controlParentEle=viewParentEle) {


  var model = {
    table: table,
    tableIds: getTableIds(),
  }


  var view = {
    ele: addEle(viewParentEle),
    render: function() {
      table.ele.innerHTML = genTableHtml(model.table.id)
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


  view.ini()
  control.ini()

}
