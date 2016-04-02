angular.module('main.customers', [])

.controller('CustomersCtrl', function($state, $scope, $filter, $rootScope, $ionicLoading, Api) {
	
	function getCustomers() {
		$scope.customers = [];
		$ionicLoading.show({
			template:'Loading...'
		});
		Api.getAuthoizationData()
		.then(function(result) {
			$rootScope.authorKey = result.token;
			Api.getCustomers($rootScope.authorKey, 1)
			.then(function(res) {
				for (var i = res.length - 1; i >= 0; i--) {
					var ii;
					if (!res[i].image) {
						ii='img/user.png';
					} else {
						ii=res[i].image;
					}

					$scope.customers.push({
						index: res[i].id,
						photo: ii,
						name: res[i].name
					});
				}
				console.log($scope.customers);
				$ionicLoading.hide();
			});
		});
	}

	getCustomers();
	$scope.goEditCustomer=function(index) {
		$state.go('editcustomer',{myindex:index});
	}
	$scope.goAddCustomer = function() {
		$state.go('addcustomer');
	}
})