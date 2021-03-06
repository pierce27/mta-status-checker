var mta = angular.module('mta', ['ngSanitize']);


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

mta.controller('mtaCtrl', function PublisherCtrl($scope, $http) {	

	$scope.search ={name:'', status:'', type:''}

	// Check for cookie and if it exists get user data from server
	if(document.cookie){
		console.log(document.cookie)
		$http({method: 'GET', url: '/user'}).
		success(function(data, status) {
		  // Set user data in the scope
		  $scope.user = data; 	

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
	  $scope.good = data.good;
	  $scope.counts = data.counts;
	  console.log($scope.counts);	  
	}).
	error(function(data, status) {
		// TODO Alert if error
	  
	});	

	// SIGN IN 
	$scope.signIn = function(){
		// Create user object to send to server
	    var user = {
	      'username': this.username,
	      'password': this.password
	    };

	    // Attempt to login to server
		$http.post('/login', user).
		success(function(data, status) {
		  $scope.user = data;
		  if($scope.user.favorites.size > 0){
		  	$scope.showFavorites = true;
		  } else{
		  	$scope.showFavorites = false;
		  } 
		  $('#signInWarning').addClass('hide')			
		  $('#signInModal').modal('hide');

		}).
		error(function(data, status) {

	    	$scope.signInWarning = 'Incorrect Login'
	    	$('#signInWarning').removeClass('hide')			
			
		  
		});			
	}

	// SIGN UP
	$scope.signUp = function(){
		// Create user object to send to sever
	    var user = {
	      'username': this.username,
	      'password': this.password
	    };



	    // Check that passwords match
	    if(this.password != this.confirmPassword){
	    	$scope.signUpWarning = 'Passwords Do Not Match'
	    	$('#signUpWarning').removeClass('hide')
	    } else if(this.username.length < 6 || this.password.length < 6){
	    	$scope.signUpWarning = 'Username / Pssword must be 6 characters or more'
	    	$('#signUpWarning').removeClass('hide')	    	
	    } else{
	    	// If passwords match then send data to server
			$http.post('/signUp', user).
			success(function(data, status) {
			  // Send user object of scope to the newly create user
			  $scope.user = data;
			  // Set show favorites to false because new users do not have any
		  	  $scope.showFavorites = false;
		  	  // Hide sign in modal
		  	  $('#signUpWarning').addClass('hide')
			  $('#signInModal').modal('hide');
			  $scope.signUpWarning = ''

			}).
			error(function(data, status) {
				// Alert if error  
				alert('User Name Taken')
			  
			});				    	
	    }

		
	}	

	// SIGN OUT
	$scope.signOut = function(){
		// Logout from server so cookies can be cleared
		$http.get('/logout').
		success(function(data, status){
			// Delete user object
			$scope.user = '';
			// Clear cookies
			document.cookie = '';
			// Hide favorites because user is not logged in
			$scope.showFavorites = false;
			// Show sign in modal to sign in again if needed
			$('#signInModal').modal('show');
		}).
		error(function(data, status){
			// TODO Handle error
			console.log(status)

		})
	}


	// ADD OR REMOVE A FAVORITE
	$scope.modifyFavorites = function(line){
		// Make copy of current user favorites
		var favorites = $scope.user.favorites;
		// If new favorites is removed then decrement it otherwise increment it
		if(favorites[line.name[0]] == false){
			
			favorites.size = favorites.size - 1
		} else{
			
			favorites.size = favorites.size + 1
		}
		
		// Send new favorites object to server to save on current user
		$http.post('/favorites', favorites).
		  success(function(data, status, headers, config) {
		  	console.log('saved: '+ data)
		  	$scope.user = data;
		  }).
		  error(function(data, status, headers, config) {
		    // TODO Handle Error
		    alert('Error saving data ' + status)

		  });			
		
	}

	// Display details of selected line by setting currentLine to the line passed from view and display modal
	$scope.displayDetails = function(line){
		$scope.currentLine = line;
		$('#detailsModal').modal('show');

	}


	// FAVORITES FILTER
	$scope.favoritesFilter = function(line){
	    // Check if favorites should be filtered and check if line is favorite. If not then return all as true
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

	// When using search or filters, run this params on all
	$scope.hideFavorites = function(){
		$scope.showFavorites = false;
	}


	$scope.statusFilter = function(status){
		$scope.search.status = status;
	}






});







