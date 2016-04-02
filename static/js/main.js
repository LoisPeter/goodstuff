angular.module('app.main', ['ionic', 'app.services'])

// For the real endpoint, we'd use this
// .constant('ApiEndpoint', {
//  url: 'http://cors.api.com/api'
// })
.controller('MainCtrl', function($scope, $state,  $rootScope, $http, ApiEndpoint, Api, $ionicSideMenuDelegate ) {
	$scope.day = moment();

	$rootScope.authorKey = '';

	/*
	$scope.businesses = [];

	//==function to get all of  businesses=====
	function getAllofBusiness() {
		$ionicLoading.show({
			template:'Loading Businesses...'
		});
		Api.getAuthoizationData()
		.then(function(result) {
			$rootScope.authorKey = result.token;
			Api.getBusinesses($rootScope.authorKey)
			.then(function(res) {
				$scope.businesses = res;
				console.log('length of businesses =', $scope.businesses.length);
			});
			$ionicLoading.hide();
		});
	}
	*/
	$scope.goDetail = function(index){
		$rootScope.myAppointmentIndex=index;
		$state.go('detail');
	}

	$scope.goCitasPendient=function() {
		$state.go('main.citasPendient');
	}

	$scope.goAddAppointment=function() {
		$state.go('main.addappointment');	
	}
	$scope.goCustomers=function() {
		$state.go('main.customers');	
	}
	$scope.goAdjustment=function() {
		$state.go('main.adjustment');	
	}
	$scope.goNewAppointment=function() {
		$state.go('main.addappointment');	
	}
	$scope.goDiary=function() {
		$state.go('main.content');	
	}
	$scope.goCategories=function() {
		$state.go('main.categories');	
	}
})

.directive("calendar", function($rootScope, $ionicLoading, Api, $filter) {
    return {
        restrict: "E",
        templateUrl: "templates/calendar.html",
        scope: {
            selected: "="
        },
        link: function(scope) {
            scope.selected = _removeTime(scope.selected || moment());
            scope.month = scope.selected.clone();
            $rootScope.global_month = scope.month;
            var start = scope.selected.clone();
            start.date(1);
            _removeTime(start.day(0));

            //function to get all of appointments
			function getAllofAppointments() {
				$rootScope.appointments = [];
				$ionicLoading.show({
					template:'Loading...'
				});
				Api.getAuthoizationData()
				.then(function(result) {
					$rootScope.authorKey = result.token;
					Api.getAppointments($rootScope.authorKey, 1)
					.then(function(res) {
						$rootScope.appointments = res;
						_buildMonth(scope, start, scope.month);
						$ionicLoading.hide();
					});
				});
			}

			//function to get all of services
			function getAllofServices() {
				$rootScope.services = [];
				$ionicLoading.show({
					template:'Loading...'
				});
				Api.getAuthoizationData()
				.then(function(result) {
					$rootScope.authorKey = result.token;
					Api.getServices($rootScope.authorKey, 1)
					.then(function(res) {
						$rootScope.services = res;
						$ionicLoading.hide();
					});
				});
			}

			//function to get all of resources
			function getAllofResources() {
				$rootScope.resources = [];
				$ionicLoading.show({
					template:'Loading...'
				});
				Api.getAuthoizationData()
				.then(function(result) {
					$rootScope.authorKey = result.token;
					Api.getResources($rootScope.authorKey, 1)
					.then(function(res) {
						$rootScope.resources = res;
						$ionicLoading.hide();
					});
				});
			}
			//function to get an appointment for a day
			function getAppointmentforDate(mydate) {
				$rootScope.this_date = mydate;
				$rootScope.appointmentsforDate = [];
				$ionicLoading.show({
					template:'Loading...'
				});
				Api.getAuthoizationData()
				.then(function(result) {
					$rootScope.authorKey = result.token;
					Api.getAppointmentforDate($rootScope.authorKey, 1, mydate)
					.then(function(res) {
						for (var i = res.length - 1; i >= 0; i--) {
							var tt = new Date(res[i].date);
							tt.setMinutes(tt.getMinutes()+res[i].service.duration);

							$rootScope.appointmentsforDate.push({
								index: res[i].id,
								timeFrom: $filter('date')(res[i].date, 'HH:mm'),
								timeTo: $filter('date')(tt, 'HH:mm'),
								itemColor: '#'+res[i].service.color,
								customerName: res[i].customer.name,
								serviceName: res[i].service.name
							});
						}
						//$rootScope.appointmentsforDate = res;

						setTimeout(function () {
				          $rootScope.$apply(function () {
				          });
      					}, 200);
						$ionicLoading.hide();
					});
				});
			}

			getAllofAppointments();
			getAllofServices();
			getAllofResources();

			var td = new Date();
			var ttd = $filter('date')(td, 'yyyy-MM-dd');
			console.log(ttd);
			getAppointmentforDate(ttd);

            scope.select = function(day) {
            	scope.selected = day.date;
                var s = $filter('date')(scope.selected._d, 'yyyy-MM-dd');
                getAppointmentforDate(s);
            };

            scope.next = function() {
                var next = scope.month.clone();
                _removeTime(next.month(next.month()+1).date(1));
                scope.month.month(scope.month.month()+1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month()-1).date(1));
                scope.month.month(scope.month.month()-1);
                _buildMonth(scope, previous, scope.month);
            };
        }
    };
    
    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
        	for (var j = $rootScope.appointments.length - 1; j >= 0; j--) {
        		var ss = $filter('date')($rootScope.appointments[j].date, 'yyyy-MM-dd');
        		var tt = $filter('date')(date._d, 'yyyy-MM-dd');
        		var bb = false;
        		if (ss===tt) {
        			bb=true;
        			break;
        		}
        	}
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                isEvent: bb,
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
});