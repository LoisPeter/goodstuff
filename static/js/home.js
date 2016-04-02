angular.module('app.home', [])

.controller('homeCtrl', function($scope, $state) {
	$scope.doLogin = function(){
		$state.go('main.content');
	};
})