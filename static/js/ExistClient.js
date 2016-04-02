angular.module('main.addappointment.existclient', ['ionic', 'app.services'])

.controller('ExistClientCtrl', function($rootScope, $scope, $ionicLoading, Api, $filter) {
	$scope.customers = [];
	$scope.customer = {};

	function getCustomers() {
		$ionicLoading.show({
			template:'Loading...'
		});
		Api.getCustomers($rootScope.authorKey, 1)
		.then(function(res) {
			$scope.customers = res;
			$ionicLoading.hide();
			console.log($scope.customers);
		});
	}

	getCustomers();

	$scope.clickSubItem = function(customer) {
		$scope.customer = customer;
		console.log($scope.customer);
	}
})