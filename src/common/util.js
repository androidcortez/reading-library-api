const getUTCDateTime = (function () {
  var today = new Date();
  var date =
    today.getUTCFullYear() +
    "-" +
    (today.getUTCMonth() + 1) +
    "-" +
    today.getUTCDate();
  var time =
    today.getUTCHours() +
    ":" +
    today.getUTCMinutes() +
    ":" +
    today.getUTCSeconds();
  var dateTime = date + " " + time;
  return dateTime;
})();

function contentArrayInt(array) {
  let allValuesInteger = true;
  for (i = 0; i < array.length; i++) {
    if (!Number.isInteger(array[i])) {
      allValuesInteger = false;
      break;
    }
  }
  return allValuesInteger;
}

function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateString.match(regEx)) {
    return false; // Invalid format
  }

  var d = new Date(dateString);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) {
    return false; // NaN value, Invalid date
  }

  return d.toISOString().slice(0, 10) === dateString;
}

module.exports = {
  getUTCDateTime,
  contentArrayInt,
  isValidDate
};
