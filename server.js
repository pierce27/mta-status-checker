// MTA status functions
var mta = require('./mta')
// Routing middleware
var http = require('http');
var express = require('express');
var app = express();
// View engine dependency
var engines = require('consolidate');
// Login dependencites
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = require('./user')
var bodyParser = require('body-parser')
// View config
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/resources'));
app.engine('html', engines.ejs);
app.set('view engine', 'html');
// Passport login config
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// Send all mta status data
app.get('/mta/status', mta.status)

// Render main view
app.get("/", function(req, res){res.render('index.html')})

passport.use(new LocalStrategy(function(username, password, done) {
    // no authentication logic here... just return done with an object with 2 fields
    user.findUser(username, password, done)
}));

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);
 
app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});
 
app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Start Sever
app.listen(process.env.PORT || 3000)



