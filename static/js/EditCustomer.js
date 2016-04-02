angular.module('app.editcustomer', ['ionic', 'app.services'])

.controller('EditCustomerCtrl', function($scope, $rootScope, $state, $ionicLoading, Api, $ionicHistory, $stateParams) {
	
	console.log($stateParams.myindex);

	$scope.customer = {};
	$scope.countries = [];
	$scope.regions = [];
	$scope.states = [];
	$scope.cities = [];

	function getCustomer(index) {
		$ionicLoading.show({
			template:'Loading...'
		});
		Api.getAuthoizationData()
		.then(function(result) {
			$rootScope.authorKey = result.token;
			Api.getCustomer($rootScope.authorKey, 1, index)
			.then(function(res) {
				$scope.customer= res;
				getRegions($scope.customer.country.id);
				getStates($scope.customer.country.id, $scope.customer.region.id);
				getCities($scope.customer.country.id, $scope.customer.region.id, $scope.customer.state.id);
				$ionicLoading.hide();
			});
		});
	}

	function patchCustomer(index, data) {
		$ionicLoading.show({
			template:'Saving...'
		});
		Api.getAuthoizationData()
		.then(function(result) {
			$rootScope.authorKey = result.token;
			Api.patchCustomer($rootScope.authorKey, 1, index, data)
			.then(function(res) {
				$ionicLoading.hide();
			});
		});
	}

	function deleteCustomer(index) {
		$ionicLoading.show({
			template:'Deleting...'
		});
		Api.getAuthoizationData()
		.then(function(result) {
			$rootScope.authorKey = result.token;
			Api.deleteCustomer($rootScope.authorKey, 1, index)
			.then(function(res) {
				$ionicLoading.hide();
				$scope.customer = {};
			});
		});
	}

	var getCountries = function() {
		$ionicLoading.show({
			template:'Loading...'
		});
		Api.getCountries($rootScope.authorKey)
		.then(function(res) {
			$scope.countries = res;
			$ionicLoading.hide();
		});
	}

	var getRegions = function(index) {
		$ionicLoading.show({
			template:'Loading...'
		});
		Api.getRegions($rootScope.authorKey, index)
		.then(function(res) {
			$scope.regions = res;
			$ionicLoading.hide();
		});
	}

	var getStates = function(index_country, index_region) {
		$ionicLoading.show({
			template:'Loading...'
		});
		Api.getStates($rootScope.authorKey, index_country, index_region)
		.then(function(res) {
			$scope.states = res;
			$ionicLoading.hide();
		});
	}

	var getCities = function(index_country, index_region, index_state) {
		$ionicLoading.show({
			template:'Loading...'
		});
		Api.getCities($rootScope.authorKey, index_country, index_region, index_state)
		.then(function(res) {
			$scope.cities = res;
			$ionicLoading.hide();
		});
	}

	getCustomer($stateParams.myindex);
	getCountries();

	$scope.selectCountry = function(country) {
		console.log('selected country id', country);
		if (country) {
			getRegions(country);	
		}
	}

	$scope.selectRegion = function(country, region) {
		console.log('selected region id', region);
		console.log('selected country id', country);
		if (country && region) {
			getStates(country, region);
		}
	}

	$scope.selectState = function(country, region, state) {
		console.log('selected state id', state);
		console.log('selected region id', region);
		console.log('selected country id', country);
		if (country && region && state) {
			getCities(country, region, state);
		}
	}

	$scope.goBack=function() {
		$state.go('main.customers');
	}

	$scope.save = function() {
		patchCustomer($stateParams.myindex, $scope.customer);
	}

	$scope.delete = function() {
		console.log($scope.customer);
		deleteCustomer($stateParams.myindex);
	}
})