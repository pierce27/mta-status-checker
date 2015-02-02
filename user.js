var mongoose = require('mongoose');
var url = 'mongodb://heroku_app33603871:f9c7duc480hd7kvt8m3940b6tv@ds039421.mongolab.com:39421/heroku_app33603871/mta'
// 'mongodb://localhost/test'
mongoose.connect(url);

var User = mongoose.model('User',{
    username: String,
    password: String,
    favorites: Object
});

var testuser = new User({username: 'apierce', password: 'password1', favorites: {'size':0}})
testuser.save(function (err, testuser) {
  if (err) return console.error(err);
  console.log(testuser + 'saved')
});

exports.findUserLogin = function(username, password, done){

	User.findOne({ 'username': username }, function (err, user) {
	  if (err) return done(null, false);

	  if(user){
		if(user.password == password){
	  	  console.log('found user')
	  	  return done(null, user)
	    } else{
	  	  return done(null, false)
	    }	  	
	  } else{
	  	return done(null, false)
	  }
	  
	  
	})
}

exports.createUser = function(username, password, done){

	newUser = new User({username: username, password: password, favorites: {'size':0}})
	
	User.findOne({ 'username': username }, function (err, user) {
	  if (err) return done(null, false);

	  if(!user){
	  	console.log('no user')
	  	newUser.save()
	  	return done(null, newUser)
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


exports.modifyFavorites = function(req, res){

	// Find user and save doc
	User.findOne({ username: req.cookies.user }, function (err, user){
	  user.favorites = req.body;
	  console.log('saved favorites for  ' + user.username)
	  res.send(user)
	  user.save();
	});

}











