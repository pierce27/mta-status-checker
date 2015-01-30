var users = [{'username':'apierce', 'password': 'password1'}, {'username':'mike', 'password': 'password2'}];


exports.findUser = function(username, password, done){
	console.log(username)
	if(username){
		for(user in users){
			if(users[user].username == username){
				if(users[user].password == password){
					return done(null, user)
				} else{
					return done(null, false)
				}
			}
		}	
	} else{
		return done(null, false)
	}


}