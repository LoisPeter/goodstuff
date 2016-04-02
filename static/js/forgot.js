angular.module('app.forgot', [])

.controller('forgotCtrl', function($scope, $state) {
	$scope.goLogin = function() {
		$state.go('login');
	}
})