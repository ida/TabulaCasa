function dateIsOlderThanOtherDate(aDate, anotherDate) {
  anotherDate = Number(dateToNumberString(anotherDate))
  aDate = Number(dateToNumberString(aDate))
  return anotherDate - aDate > 0
}

function dateToNumberString(string) {
  // Expects 'DD.MM.YYYY' or 'MM/DD/YYYY', returns 'YYYYMMDD'.
  if(string.indexOf('/') > -1) {
    string = string.slice(3, 5) + '.'
           + string.slice(0, 2) + '.'
           + string.slice(6, 10)
  }
  return string.split('.').reverse().join('')
}

function getDayNrOfDateNrStr(dateNrStr) {
  return Number(dateNrStr.slice(6, 8))
}

function getDaysOfMonth(monthNrOrStr) {
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  monthNrOrStr = Number(monthNrOrStr) - 1
  return Number(monthDays[monthNrOrStr])
}

function getDaysOfMonths(monthNew, monthOld) {
  var days = 0
  while(monthOld < monthNew) {
    monthOld += 1
    days += getDaysOfMonth(monthOld)
  }
  return days
}

function getDaysUntilEndOfMonth(dateNrStr) {
  var day = getDayNrOfDateNrStr(dateNrStr)
  var days = getDaysOfMonth(getMonthNrOfDateNrStr(dateNrStr))
  return days - day
}

function getMonthNrOfDateNrStr(dateNrStr) {
  return Number(dateNrStr.slice(4, 6))
}

function getYearNrOfDateNrStr(dateNrStr) {
  return Number(dateNrStr.slice(0, 4))
}

function getDateDiffInDays(aDate, anotherDate) {

  aDate = dateToNumberString(aDate)
  anotherDate = dateToNumberString(anotherDate)

  var days = null
  var dateNew = aDate
  var dateOld = anotherDate

  if(dateIsOlderThanOtherDate(aDate, anotherDate) == true) {
    dateNew = anotherDate
    dateOld = aDate
  }

  var dayNew = getDayNrOfDateNrStr(dateNew)
  var dayOld = getDayNrOfDateNrStr(dateOld)

  var monthNew = getMonthNrOfDateNrStr(dateNew)
  var monthOld = getMonthNrOfDateNrStr(dateOld)

  days = dayNew - dayOld     // same month

  if(monthNew != monthOld) { // months differ
    days = getDaysUntilEndOfMonth(dateOld)
    monthOld += 1
    days += getDaysOfMonths(monthNew, monthOld)
    days += dayNew
  }

  days += 365 * (getYearNrOfDateNrStr(dateNew) - getYearNrOfDateNrStr(dateOld))

  return days
}

