var http = require('http');
var express = require('express');
var mta = require('./mta')
var app = express();
var engines = require('consolidate');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/resources'));
app.engine('html', engines.ejs);
app.set('view engine', 'html');

// Send all mta status data
app.get('/mta/status', mta.status)

// Render main view
app.get("/", function(req, res){res.render('index.html')})

// Start Sever
app.listen(3000)



