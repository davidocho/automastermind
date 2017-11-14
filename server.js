var express = require("express");
var cors = require("cors");
var app = express();
 
 
// Logging middleware
app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});
app.use(express.static(__dirname + '/public')); 
app.use(cors());
// set routes
app.get('/', function(req, res) {
  res.render('index');
});

// Set server port
var port = process.env.PORT || 4050;
app.listen(port);
console.log("Server is running at => http://localhost:" + port + "/\nCTRL + C to shutdown");
