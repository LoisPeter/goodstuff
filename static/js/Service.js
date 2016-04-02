angular.module('app.service', [])

.controller('ServiceCtrl', function($scope, $state, $ionicHistory) {
	$scope.goBack=function() {
		$state.go('main.categories');
	}
	$scope.goNewService = function() {
		$state.go('newservice');	
	}
})