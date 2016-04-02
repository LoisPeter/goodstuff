angular.module('app.main', [])

.controller('menuCtrl', function($scope, $state) {
	$scope.goLogin = function() {
		$state.go('login');
	}
})