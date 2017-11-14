var express = require("express");
var cors = require('cors');
var app = express();
 
 
// Logging middleware
app.use(express.static('public')); 
app.use(cors());
// set routes
app.get('/', function(req, res) {
  res.render('index');
});

// Set server port
var port = process.env.PORT || 4040;
app.listen(port);
console.log("Server is running at => http://localhost:" + port + "/\nCTRL + C to shutdown");


