angular.module('app.main.multi', [])

.controller('multiCtrl', function($scope, $state, $ionicScrollDelegate) {
	$scope.goLanding=function() {
		$state.go('main.landing');
	}
})