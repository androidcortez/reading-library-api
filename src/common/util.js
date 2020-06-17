const getUTCDateTime = (function() {
    var today = new Date();
    var date = today.getUTCFullYear()+'-'+(today.getUTCMonth()+1)+'-'+today.getUTCDate();
    var time = today.getUTCHours() + ":" + today.getUTCMinutes() + ":" + today.getUTCSeconds();
    var dateTime = date+' '+time;
    return dateTime;
})();

module.exports = {
    getUTCDateTime
}