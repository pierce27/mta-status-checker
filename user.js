var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var User = mongoose.model('User',{
    username: String,
    password: String,
    favorites: Object
});

var testuser = new User({username: 'apierce', password: 'password1', favorites: {'x1 - x68':true, 'BX1 - BX55':true, '123':true}})
testuser.save(function (err, testuser) {
  if (err) return console.error(err);
  console.log(testuser + 'saved')
});


exports.findUserLogin = function(username, password, done){

	User.findOne({ 'username': username }, function (err, user) {
	  if (err) return done(null, false);

	  if(user.password == password){
	  	console.log('found user')
	  	return done(null, user)
	  } else{
	  	return done(null, false)
	  }
	  
	})
}

exports.findUser = function(req,res){

	User.findOne({ 'username': req.cookies.user }, function (err, user) {
	  if (err) return err;
	  res.send(user)
	  
	})
}