var mta = angular.module('mta', ['ngSanitize']);

mta.controller('mtaCtrl', function PublisherCtrl($scope, $http) {	

	if(document.cookie){
		console.log(document.cookie)
		$http({method: 'GET', url: '/user'}).
		success(function(data, status) {
		  // Set user data in the scope
		  $scope.user = data; 	
		  if($scope.user.favorites.size > 0){
		  	$scope.showFavorites = true;
		  }  
		}).
		error(function(data, status) {
			// TODO Alert if error
		  	alert(status)
		});			

	}

	// GET DATA FOR MTA SERVICE STATUS
	$http({method: 'GET', url: '/mta/status'}).
	success(function(data, status) {
	  $scope.lines = data.lines;
	  $scope.timestamp = data.timestamp 	  
	}).
	error(function(data, status) {
		// TODO Alert if error
	  
	});	

	$scope.login = 	function(){
	    var user = {
	      'username': this.username,
	      'password': this.password
	    };

		$http.post('/login', user).
		success(function(data, status) {
		  console.log(data);
		  $scope.user = data;
		  $('#signInModal').modal('hide');	
		}).
		error(function(data, status) {
			// TODO Alert if error
			console.log(data)
			console.log('hello error')	  
		  
		});			
	}

	$scope.modifyFavorites = function(line){
		var favorites = angular.copy($scope.user.favorites);
		if(favorites[line.name[0]] == true){
			favorites[line.name[0]] = false
			favorites.size = favorites.size - 1
		} else{
			favorites[line.name[0]] = true	
			favorites.size = favorites.size + 1
		}
		
		// Send name to server to add it to favorites array or delete it
		$http.post('/favorites', favorites).
		  success(function(data, status, headers, config) {
		  	console.log('saved: '+ data)
		  	$scope.user = data;
		  }).
		  error(function(data, status, headers, config) {
		    // TODO Handle Error
		    console.log('error '+ data)

		  });			
		
	}

	$scope.signOut = function(){
		$http.get('/logout').
		success(function(data, status){
			console.log(status)
			$scope.user = '';
			document.cookie = '';
			$scope.showFavorites = false;
		}).
		error(function(data, status){
			// TODO Handle error
			console.log(status)

		})
	}


	$scope.displayDetails = function(line){
		$scope.currentLine = line;
		$('#detailsModal').modal('show');

	}


	$scope.favoritesFilter = function(line){
	    // Do some tests
	    if($scope.showFavorites == true){
			if($scope.user.favorites[line.name[0]] == true){
				return true;
			} else{
				return false;
			}
		} else{
			return true;
		}
	}	

	$scope.hideFavorites = function(){
		$scope.showFavorites = false;
	}








});