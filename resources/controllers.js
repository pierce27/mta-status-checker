var mta = angular.module('mta', ['ngSanitize']);



mta.controller('mtaCtrl', function PublisherCtrl($scope, $http) {	

	// GET DATA FOR MTA SERVICE STATUS
	$http({method: 'GET', url: '/mta/status'}).
	success(function(data, status) {
	  // console.log(data)
	  $scope.subways = data.subway[0].line;
	  $scope.buses = data.bus[0].line;
	  $scope.btLines = data.BT[0].line;
	  $scope.lirrLines = data.LIRR[0].line;
	  $scope.metroNorthLines = data.MetroNorth[0].line;
	  
	}).
	error(function(data, status) {
		// TODO Alert if error
	  
	});		
});