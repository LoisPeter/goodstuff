angular.module('app.newservice', [])

.controller('NewServiceCtrl', function($scope, $state, $ionicHistory) {
	$scope.goBack=function() {
		$state.go('service');
	}
})