var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var url = 'mongodb://heroku_app33603871:f9c7duc480hd7kvt8m3940b6tv@ds039421.mongolab.com:39421/heroku_app33603871/mta'
// 'mongodb://localhost/test'
mongoose.connect(url);

// Create User Schema
var User = mongoose.model('User',{
    username: String,
    password: String,
    favorites: Object
});


// Find user in DB and return it when logging in.
exports.findUserLogin = function(username, password, done){

	User.findOne({ 'username': username }, function (err, user) {
	  if (err) return done(null, false);

	  if(user){
		if(bcrypt.compareSync(password, user.password)){
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

// Create User when signing up. Encrypt password to save to DB
exports.createUser = function(username, password, done){

	var hash_password = bcrypt.hashSync(password, 8);
	console.log(hash_password)

	newUser = new User({username: username, password: hash_password, favorites: {'size':0}})
	
	User.findOne({ 'username': username }, function (err, user) {
	  if (err) return done(null, false);

	  // If user does not exist save it, other wise return an error
	  if(!user){
	  	newUser.save()
	  	return done(null, newUser)
	  } else{
	  	return done(null, false)
	  }
	  
	})	
}

// Return User to client when a user is returning to site and has proper cookie
exports.findUser = function(req,res){

	// Find user based on cookie
	User.findOne({ 'username': req.cookies.user }, function (err, user) {
	  if (err) return err;
	  res.send(user)
	  
	})
}

// Add or Delete favorite for User
exports.modifyFavorites = function(req, res){

	// Find user and save doc
	User.findOne({ username: req.cookies.user }, function (err, user){
	  user.favorites = req.body;
	  console.log('saved favorites for  ' + user.username)
	  res.send(user)
	  user.save();
	});

}











