var mta = require('./mta')
var express = require('express');
var http = require('http');
var app = express();
var engines = require('consolidate');
// app.use(express.bodyParser());
app.set('views', __dirname + '/views');
app.engine('html', engines.ejs);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/resources'));



app.get('/bus', mta.status)
app.get("/", function(req, res){res.render('index.html')})
app.listen(3000)



