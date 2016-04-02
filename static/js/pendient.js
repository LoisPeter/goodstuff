angular.module('main.pendient', ['app.services'])

.controller('PendientCtrl', function($scope, $filter, $rootScope, $ionicLoading, Api) {
	// function to get pending appointments
	function getAppointmentforPending(pending) {
		$scope.pendingAppointments = [];
		$ionicLoading.show({
			template:'Loading...'
		});
		Api.getAuthoizationData()
		.then(function(result) {
			$rootScope.authorKey = result.token;
			Api.getAppointmentforPending($rootScope.authorKey, 1, pending)
			.then(function(res) {
				for (var i = res.length - 1; i >= 0; i--) {
					
					var ff = new Date(res[i].date);
					var service_duration = (res[i].service != null) ? res[i].service.duration : 0;
					ff.setMinutes(ff.getMinutes()+service_duration);

					var color = (res[i].service != null) ? res[i].service.color : 'FFF';
					var service_name = (res[i].service != null) ? res[i].service.name : 'FFF';
					var customer_name = (res[i].customer != null) ? res[i].customer.name : '';
					var resource_name = (res[i].resource != null) ? res[i].resource.name : '';
					
					$scope.pendingAppointments.push({
						index: res[i].id,
						itemcolor: color,
						datetime:$filter('date')(ff, 'dd MMMM yyyy')+', '+$filter('date')(res[i].date, 'HH:mm')+' - '+$filter('date')(ff, 'HH:mm'),
						customerName: customer_name,
						service_resource: service_name+' - '+resource_name
					});
				}
				$ionicLoading.hide();
			});
		});
	}
	// accept event
	$scope.accept = function(index) {
		console.log(index);
	}
	//decline event
	$scope.decline = function(index) {
		console.log(index);	
	}
	getAppointmentforPending(true);
})