// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// empty timestamp endpoint
app.get("/api/timestamp/", (req, res) => {
  var date = new Date()
  res.json({unix: date.getTime(), utc: date.toUTCString()})
})

// Integer check
var isInt = (value) =>{
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}

// date validation
var checkDateValue = (date) =>{
    return date && (!(new Date(date) == "Invalid Date") && !isNaN(new Date(date)));
};

// timestamp with a time to validate
app.get("/api/timestamp/:date_string", (req, res) => {
  var unixTime=null;
  var utcTime="Invalid Date";
  var data = req.params.date_string
  // check first 10 chars of param
  if (isInt(data.substr(0,10))) {
    var date = new Date()
    date.setTime(data)
    unixTime = date.getTime()
    utcTime = date.toUTCString()
  } else {
    var msec = Date.parse(data)
    if (checkDateValue(msec) ) {
      var date = new Date(msec)
      unixTime = date.getTime()
      utcTime = date.toUTCString()
    } 
  }
  res.json({unix: unixTime, utc: utcTime}) 
})

var stardate = require("./stardate.js").stardate

app.get("/api/stardate/", (req, res) => {
  var star = stardate(new Date())
  res.json({stardate: star})
})

app.get("/api/stardate/:date_string", (req, res) => {
  var starTime="Invalid Date"
  var data = req.params.date_string
  // check first 10 chars of param
  if (isInt(data.substr(0,10))) {
    var date = new Date()
    date.setTime(data)
    starTime = stardate(date)
    
  } else {
    var msec = Date.parse(data)
    if (checkDateValue(msec) ) {
      var date = new Date(msec)
      starTime = stardate(date)
    } 
  }
  res.json({stardate: starTime})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});