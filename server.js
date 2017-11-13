//var connect = require('connect');
//var app = connect();
//var serveStatic = require('serve-static');
//var port = process.env.PORT || 3000;
//app.listen(port);
//app.use(serveStatic(__dirname)).listen('port', function(){
//    console.log('Server running on 3000...');
//});


var express = require('express')
var serveStatic = require('serve-static')
var port = process.env.PORT || 3000;

var app = express()
//app.use(serveStatic(path.join(__dirname, 'public'));
app.use(serveStatic('public', {'index': ['index.html']}))
app.listen(port);

//var express = require('express');
//var app = express();

////app.set('port', (process.env.PORT || 3000));
//var port = process.env.PORT || 3000;
//app.listen(port);
//
//app.use(express.static(__dirname + '/public'));

