angular.module('app.home', [])

.controller('homeCtrl', function($scope, $state) {
	$scope.doLogin=function() {
		$state.go('login');
	}
	$scope.doRegister=function() {
		$state.go('main.register');
	}
})