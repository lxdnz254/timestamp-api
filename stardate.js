// file to convert timestamp to start date

const base=2005
const stardateYear=58000.0

var getMonthNumber = (date) => {
  var first = new Date(date.getFullYear(), 0, 1);
  var theDay = Math.round(((date - first) / 1000 / 60 / 60 / 24) + .5, 0);
  return theDay - date.getDate()
}

var isLeapYear = (date) => {
 var leapYear = new Date(date.getFullYear, 1, 29); 
 return (leapYear.getDate() == 29) 
}

var getYearNumber = (date) => {
 return isLeapYear(date) ? 366 : 365 
}

var stardate = (date) => {
  // c + (1000*(y-b)) + ((1000/n)*(m + d -1))
  var sDate = stardateYear 
    + (1000 * (date.getFullYear() - base)) 
    + ((1000/getYearNumber(date))
       * (getMonthNumber(date) + date.getDate() -1))
  return sDate.toFixed(2)
}

exports.stardate = stardate;