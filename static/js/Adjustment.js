angular.module('main.adjustment', [])

.controller('AdjustmentCtrl', function($scope, $ionicHistory) {
	$scope.goBack=function() {
		$ionicHistory.goBack();
	}
})