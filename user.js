var util = require('util');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var User = mongoose.model('User',{
    username: String,
    password: String,
    favorites: Array
});

var testuser = new User({username: 'apierce', password: 'password1', favorites: ['x1']})
testuser.save(function (err, testuser) {
  if (err) return console.error(err);
  console.log(testuser + 'saved')
});










var users = [{'username':'apierce', 'password': 'password1'}, {'username':'mike', 'password': 'password2'}];


exports.findUser = function(username, password, done){

	Person.findOne({ 'username': username }, function (err, user) {
	  if (err) return done(null, false);

	  if(user.password == password){
	  	return done(null, user)
	  	console.log(user)
	  } else{
	  	return done(null, false)
	  	console.log(user)
	  }
	  
	})


}