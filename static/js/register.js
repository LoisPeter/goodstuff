angular.module('app.main.register', [])

.controller('registerCtrl', function($ionicPopup, $scope, $state) {
	$scope.doRegister=function() {

		var alert_register = $ionicPopup.alert({
			title: 'Create account',
			template: 'Account has been created successfully!'
		});

		alert_register.then(function(res) {
			$state.go('login');
		})
	}
})