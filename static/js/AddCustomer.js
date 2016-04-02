angular.module('app.addcustomer', ['app.services'])

.controller('AddCustomerCtrl', function($scope, $state, $ionicHistory, $ionicLoading, Api, $rootScope) {
	
	$scope.customer = {};
	$scope.countries = [];
	$scope.regions = [];
	$scope.states = [];
	$scope.cities = [];

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

	var addCustomer = function (data) {
		$ionicLoading.show({
			template:'Saving...'
		});
		Api.addCustomer($rootScope.authorKey, 1, data)
		.then(function(res) {
			$ionicLoading.hide();
		});
	}

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

	$scope.save = function() {
		addCustomer($scope.customer);
	}

	$scope.goBack=function() {
		$state.go('main.customers');
	}
})