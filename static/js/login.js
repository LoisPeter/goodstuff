angular.module('app.login', [])

.controller('loginCtrl', function($scope, $state) {
	$scope.goForgot = function() {
		$state.go('forgot');
	}	
})