angular.module('app.main.register', [])

.controller('registerCtrl', function($scope, $state) {
	$scope.doLogin=function() {
		$state.go('login');
	}
})