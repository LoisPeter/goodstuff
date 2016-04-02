angular.module('app.newcategory', [])

.controller('NewCategoryCtrl', function($scope, $state, $ionicHistory) {
	$scope.goBack=function() {
		$state.go('main.categories');
	}
})