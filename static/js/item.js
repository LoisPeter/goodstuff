angular.module('app.main.item', [])

.controller('itemCtrl', function($scope, $state, $ionicScrollDelegate) {
	$scope.goLanding=function() {
		$state.go('main.landing');
	}

})