var mta = angular.module('mta', ['ngSanitize']);



mta.controller('mtaCtrl', function PublisherCtrl($scope, $http) {	


	// GET DATA FOR MTA SERVICE STATUS
	$http({method: 'GET', url: '/mta/status'}).
	success(function(data, status) {
	  console.log(data)
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
		}).
		error(function(data, status) {
			// TODO Alert if error
			console.log(data)
			console.log('hello error')	  
		  
		});			
	}
});