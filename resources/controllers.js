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
});