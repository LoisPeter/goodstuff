angular.module('app.detail', [])

.controller('DetailCtrl', function($scope, $ionicPopup, $state, $filter, $rootScope, $ionicLoading, Api, $ionicHistory) {
	$scope.appointmentsforIndex = {};
	function getAppointmentforIndex(index) {
		$ionicLoading.show({
			template:'Loading...'
		});
		Api.getAuthoizationData()
		.then(function(result) {
			$rootScope.authorKey = result.token;
			Api.getAppointmentforIndex($rootScope.authorKey, 1, index)
			.then(function(res) {
				$scope.appointmentsforIndex.index = res.id;
				$scope.appointmentsforIndex.name = (res.customer != null) ? res.customer.name: '';
				$scope.appointmentsforIndex.email = (res.customer != null) ? res.customer.email: '';
				$scope.appointmentsforIndex.phone = (res.customer != null) ? res.customer.phone1: '';
				$scope.appointmentsforIndex.provider = (res.resource != null) ? res.resource.name: '';
				$scope.appointmentsforIndex.service = (res.service != null) ? res.service.name: '';
				$scope.appointmentsforIndex.from = $filter('date')(res.date, 'HH:mm');
				var tt = new Date(res.date);
				if(res.service != null)tt.setMinutes(tt.getMinutes()+res.service.duration);
				$scope.appointmentsforIndex.to = $filter('date')(tt, 'HH:mm');
				$scope.appointmentsforIndex.toDate = $filter('date')(tt, 'yyyy-MM-dd');
				$scope.appointmentsforIndex.note = res.body;
				var ss = res.status;
				switch(ss) {
					case 0:
						$scope.appointmentsforIndex.state = 'New';
						break;
					case 1:
						$scope.appointmentsforIndex.state = 'Accepted';
						break;
					case 2:
						$scope.appointmentsforIndex.state = 'Rejected by business';
						break;
					case 3:
						$scope.appointmentsforIndex.state = 'Rejected by customer';
						break;
					case 4:
						$scope.appointmentsforIndex.state = 'Completed';
						break;
					case 5:
						$scope.appointmentsforIndex.state = 'Deleted';
						break;
					default:
						$scope.appointmentsforIndex.state = 'None';
				}
				$ionicLoading.hide();
			});
		});
	}

	getAppointmentforIndex($rootScope.myAppointmentIndex);

	$scope.save = function() {
		console.log($scope.appointmentsforIndex);
	}
	$scope.goBack = function() {
		$state.go('main.content');
	}
})