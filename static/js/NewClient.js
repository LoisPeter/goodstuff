angular.module('main.addappointment.newclient', ['ionic','app.services'])

.controller('NewClientCtrl', function($rootScope, $scope, $ionicLoading, Api, $filter) {
	$scope.customer = {};
	$scope.appointment = {};
	$scope.appointment.service = {};
	$scope.appointment.customer = {};

	$scope.services = [];
	$scope.resources = [];
	$scope.peoples = [];
	$scope.myDate = {};

	$scope.peopleflag = false;

	var d = new Date();

	//$scope.myDate.fromdate = $filter('date')(d, 'MMM d, y, h:mm a');
	$scope.myDate.fromdate = d;
	$scope.myDate.duration = 0;
	

	function cal_time () {
		var dd= new Date($scope.myDate.fromdate);
		dd.setMinutes(dd.getMinutes() + $scope.myDate.duration);
		//$scope.myDate.totime = $filter('date')(dd, 'h:mm a');
		$scope.myDate.totime = dd;
	}	
	
	$scope.status = [
	{id: 0, name: 'New'},
	{id: 1, name: 'Accepted'},
	{id: 2, name: 'Rejected by business'},
	{id: 3, name: 'Rejected by customer'},
	{id: 4, name: 'Completed'},
	{id: 5, name: 'Deleted'}
	];

	$scope.changeFromdate = function () {
		cal_time();
	}

	//function to get all of services
	function getAllofServices() {
		$ionicLoading.show({
			template:'Loading...'
		});
		Api.getServices($rootScope.authorKey, 1)
		.then(function(res) {
			$scope.services = res;
			$ionicLoading.hide();
		});
	}

	//function to get all of resources
	function getAllofResources() {
		$ionicLoading.show({
			template:'Loading...'
		});
		Api.getResources($rootScope.authorKey, 1)
		.then(function(res) {
			$scope.resources = res;
			$ionicLoading.hide();
		});
	}

	function addAppointment(customer, appointment) {
		$ionicLoading.show({
			template:'Saving...'
		});

		Api.addCustomer($rootScope.authorKey, 1, customer)
		.then(function(res) {
			$scope.appointment.customer = res;
			console.log('ffff', $scope.appointment);
			Api.addAppointment($rootScope.authorKey, 1, $scope.appointment)
			.then(function(res) {
			});
			$ionicLoading.hide();
		});
	}

	function getPeople(index) {
		$ionicLoading.show({
			template:'Loading...'
		});

		Api.getService($rootScope.authorKey, 1, index)
		.then(function(res) {
			$scope.peoples = [];
			for (var i = res.people; i > 0; i--) {
				$scope.peoples.push({index:i, value:i});
			}
			$scope.myDate.duration = res.duration;
			cal_time();

			$scope.peopleflag = true;

			$ionicLoading.hide();
		});
	}

	getAllofResources();
	getAllofServices();
	cal_time();

	$scope.selectService = function(index) {
		getPeople(index);
	}

	$scope.save = function() {
		console.log($scope.customer);
		tt = new Date($scope.myDate.fromdate);
		
		$scope.appointment.date = $filter('date')(tt, 'yyyy-MM-ddTHH:mm:ssZ');

		console.log($scope.appointment);
		addAppointment($scope.customer, $scope.appointment);
	}
})