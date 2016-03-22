angular.module('app.main.landing', [])

.controller('landingCtrl', function($scope, $state, $ionicScrollDelegate) {
	$scope.goItem=function() {
		$state.go('main.item');
	}
	$scope.goMulti=function() {
		$state.go('main.multi');
	}
	$scope.goMypos = function() {
		setTimeout(function() {
			$ionicScrollDelegate.$getByHandle('vvvvv').scrollTo(450, 0, true
				);
		}, 50);
	}
	$scope.goList = function() {
		$state.go('main.list');
	}
})