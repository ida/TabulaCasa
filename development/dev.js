function reload(ms=2727) {
  setInterval(function() {
    window.location.href = window.location.href
  }, ms);
}
function dev(html='') {
  var devEleId = 'dev'
  var devEle = document.getElementById(devEleId)
  if(devEle == null) { // create devEle, if it doesn't exist already
    var parentEle = document.body
    devEle = document.createElement('div')
    devEle.id = devEleId
    parentEle.insertBefore(devEle, parentEle.firstChild)
  }
  html += '<br>' // append passed html to devEle, prepend with a linebreak
  devEle.innerHTML += html
}
var csv = 'Ida' + cellDeli + 'Ebkes' + cellDeli + '42' + rowDeli
        + 'Udo' + cellDeli + 'Linde' + cellDeli + '6i' + rowDeli
        + 'Ame' + cellDeli + 'Chera' + cellDeli + '14' + rowDeli
        + 'Bob' + cellDeli + 'Stewa' + cellDeli + '33'
var csv = 'Ida' + cellDeli + 'Ebkes' + cellDeli + '42' + rowDeli
        + 'Udo' + cellDeli + 'Linde' + cellDeli + '6i' + rowDeli
        + 'Ame' + cellDeli + 'Chera' + cellDeli + '1,500.00' + rowDeli
        + 'Bob' + cellDeli + 'Stewa' + cellDeli + '33'
var csv = '23.01.1977' + cellDeli + 'Ebkes' + cellDeli + '1' + rowDeli
        + '28.05.1937' + cellDeli + 'Chera' + cellDeli + '2' + rowDeli
        + '02/25/2018' + cellDeli + 'Linde' + cellDeli + '6i' + rowDeli
        + '21.09.2011' + cellDeli + 'Stewa' + cellDeli + '3'
var csv = '23.01.2014' + cellDeli + 'Ebkes' + cellDeli + '1' + rowDeli
        + '27.01.2014' + cellDeli + 'Chera' + cellDeli + '2.3.727,27' + rowDeli
        + '03.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '04.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '05.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '06.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '07.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '08.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '09.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '10.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '11.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '12.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '13.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '14.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '15.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '16.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '17.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '18.02.2014' + cellDeli + 'Linde' + cellDeli + '6' + rowDeli
        + '12.02.2016' + cellDeli + 'Stewa' + cellDeli + '3'

/*
localStorage.clear(); addTable(27, csv)
var actionEle = document.getElementsByTagName('select')[1]
var actionsEle = actionEle.parentNode
var whatEle = document.getElementsByTagName('select')[2]
var startNr = document.getElementsByTagName('input')[0]
actionEle.onchange(actionEle) // trigger change-event

*/
addSumRowEveryWeek(table.id)
reload(
55555)

