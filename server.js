var express = require("express");
var https = require("https");
var logger = require("morgan");
var cors = require('cors');
var app = express();
 
 
// Logging middleware
app.use(logger("combined"));
app.use(express.static('public')); 
app.use(cors());
// set routes
app.get('/', function(req, res) {
  res.render('index');
});

// Set server port
var port = process.env.PORT || 4000;
https.createServer(app).listen(port);
console.log("Server is running at => http://localhost:" + port + "/\nCTRL + C to shutdown");


