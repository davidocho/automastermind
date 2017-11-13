var express = require("express");
var http = require("http");
var logger = require("morgan");
var app = express();
 
 
// Logging middleware
app.use(logger("combined"));
app.use(express.static('public')); 
// set routes
app.get('/', function(req, res) {
  res.render('index');
});

// Set server port
var port = process.env.PORT || 4001;
http.createServer(app).listen(port);
console.log("Server is running at => http://localhost:" + port + "/\nCTRL + C to shutdown");


