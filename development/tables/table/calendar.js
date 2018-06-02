function addCalendarColumn(startDate, days, columnPos=0) {
  // startDate is expected to look like: '01.01.1970'
  // days is expected to be a whole positive number
  var dateNumberString = dateToNumberString(startDate)
  var dates = genDates(startDate, days)
  for(var i=0; i < dates.length; i++) {
    var date = dates[i]
    table.addRow(i)
    setCell(table.id, i, columnPos, date)
  }
}
function addCalendarColumnYear(year=1970, columnPos=0) {
// Add a column with a date-entry for each day of the year.
  var day = null
  var days = null
  var date = null
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  var months = 12

  while(months > 0) {
    days = monthDays[months-1]
    day = 0
    while(days > 0) {

      day += 1

      date = ''

      if(day < 10) date = '0'

      date += day

      date += '.'

      if(months < 10) date += '0'
      
      date += String(months) + '.' + String(year)

      table.addRow(day-1)

      setCell(table.id, day-1, columnPos, date)

      days -=1

    }
    months -= 1
  }
  table.show()
}
