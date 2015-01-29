var mta = angular.module('mta', ['ngSanitize']);



mta.controller('mtaCtrl', function PublisherCtrl($scope, $http) {
	
    $scope.render = function(e) {
    	console.log(e)
    	console.log($(e).html());    	
    	return $(e).html();
    }	

	$http({method: 'GET', url: '/bus'}).
	success(function(data, status) {
	  // console.log(data)
	  $scope.busLines = data;
	  // console.log(data)
	}).
	error(function(data, status) {
	  
	});		
});