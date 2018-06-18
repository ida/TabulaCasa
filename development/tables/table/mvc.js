function Tabla(id, viewParentEle, controlParentEle=viewParentEle) {


  var model = {
    id: id,
  }


  var view = {
    ele: addEle(viewParentEle),
    hide: function() { hideEle(this.ele) },
    render: function() {
      this.ele.innerHTML = getRows(model.id)
    },
    show: function() { showEle(this.ele) },
    ini: function() {
      this.ele.id = id
      this.render()
    },
  }


  var control = {

    ele: null,

    render: function() {
      this.ele.innerHTML = 'Table: ' + model.id
    },

    listen: function() {
      this.ele.onchange = function(eve) {
        view.render()
      }
    },

    ini: function() {
      this.ele = addEle(controlParentEle)
      controlParentEle.insertBefore(this.ele, view.ele)
      this.render()
      this.listen()
      this.ele.focus()
    },
  }

  var ini = function() {
    view.ini()
    control.ini()
  }
  ini()
  this.model = model
  this.view = view
}
