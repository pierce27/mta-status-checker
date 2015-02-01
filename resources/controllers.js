var mta = angular.module('mta', ['ngSanitize']);

mta.controller('mtaCtrl', function PublisherCtrl($scope, $http) {	

	if(document.cookie){
		console.log(document.cookie)
		$http({method: 'GET', url: '/user'}).
		success(function(data, status) {
		  console.log(data)
		  $scope.user = data 	  
		}).
		error(function(data, status) {
			// TODO Alert if error
		  
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
		  console.log(data) 
		  console.log('hello')
		  $scope.user = data;
		  $('#signInModal').modal('hide')	
		}).
		error(function(data, status) {
			// TODO Alert if error
			console.log(data)
			console.log('hello error')	  
		  
		});			
	}
});