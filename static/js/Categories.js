angular.module('main.categories', [])

.controller('CategoriesCtrl', function($scope, $state, $ionicHistory) {
	
	$scope.goNewCategory = function () {
		$state.go('newcategory');
	}

	$scope.goServices = function () {
		$state.go('service');
	}
})