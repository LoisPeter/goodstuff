angular.module('app.main.list', [])

.controller('listCtrl', function($scope, $state, $ionicScrollDelegate) {
	$scope.goLanding=function() {
		$state.go('main.landing');
	}
})