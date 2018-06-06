function decimalCommaToDot(value) {
  value = value.replace(/,/, '.')
  return value
}
function isNumber(value) {
  // Regard `Number` returns zero for empty strings.
  return value != '' && isNaN(Number(value)) === false
}
function prettifyNumber(number) {
  // - Always exactly two decimal-digits
  // - Never start with zero, unless number < 1
  // - At least one whole-number-digit
  number = String(number)
  // No dot:
  if(number.indexOf('.') < 0) {
    number = number + '.00'
  }
  // Has dot:
  // Starts with dot:
  else if(number.startsWith('.')) {
    number = '0' + number
  }
  // Ends with dot:
  else if(number.endsWith('.')) {
    number = number + '.00'
  }
  // Has not at least 1 char after dot:
  else if(number.split('.')[1].length < 2) {
    number = number + '0'
  }
  // Has more than 2 chars after dot:
  else if(number.split('.')[1].length > 2) {
    number = number.slice(0, number.indexOf('.') + 3)
  }
  number = thousandifyNumberString(number)

  return number

} // prettifyNumberString


function prettifyNumbers(numbers) {

  for(var i=0; i < numbers.length; i++) {
    var number = numbers[i]
    number = prettifyNumber(number)
    numbers[i] = number
  }

  return numbers

} // prettifyNumbers


function thousandifyNumberString(numberStr) {
// '1000000.00' ---> '1,000,000.00'
  var countdown = 3
  var i = numberStr.length
  var s = ''
  while(i > 0) {
    countdown -= 1
    i -= 1
    s = numberStr[i] + s
    if(numberStr[i] == '.') countdown = 3
    if(countdown == 0) {
      if(i < 0) s = ',' + s
      countdown = 3
    }
  }

  return s

} // thousandifyNumberString


function valueToNumber(value, NanEqualsZero=false) {
  // If value is not a number and NanEqualsZero is true, return zero.
  // `decimalSeparator` is expected to be present as a glob-var.
  var thousandsSeparator = ','
  if(decimalSeparator == ',') {
    thousandsSeparator = '.'
  }
  value = stripThousandsSeparator(value, thousandsSeparator)
  if(decimalSeparator == ',') value = decimalCommaToDot(value)
  value = Number(value)
  if(NanEqualsZero === true && isNaN(value) === true) value = Number(0)
  return value
}
function stripThousandsSeparator(value, separator=',') {
  value = value.split(separator).join('')
  return value
}

