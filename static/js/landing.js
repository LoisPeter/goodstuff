angular.module('app.main.landing', ['ngCordova'])

.controller('landingCtrl', function($scope, $ionicLoading, $compile, $state, $ionicScrollDelegate) {
	$scope.flag = false;
	$scope.myItem = {};

	$scope.places = [
	{
		id: 1,
		name: 'Table saw 500kr',
		type: 1,
		lat: 59.345890,
		log: 18.059380,
		items: [{
			photo: 'img/face.png',
			img:'img/item_product.png',
			spec:'500kr',
			name1: 'Table saw',
			name2: 'Skarpnack, Stockholm',
			heart: true,
			rank: 4
		},{
			photo: 'img/face1.png',
			img:'img/item_product1.png',
			spec:'500kr',
			name1: 'Table saw',
			heart: true,
			name2: 'Skarpnack, Stockholm',
			rank: 4
		}]
	},{
		id: 2,
		name: 'Canoe 300kr',
		type: 2,
		lat: 59.344355,
		log: 18.065006,
		items: [{
			photo: 'img/face2.png',
			img:'img/item_product2.png',
			spec:'300kr',
			name1: 'Canoe',
			heart: true,
			name2: 'Skarpnack, Stockholm',
			rank: 4
		}]
	},{
		id: 3,
		name: 'Dress 300kr',
		type: 3,
		lat: 59.342389,
		log: 18.057957,
		items: [{
			photo: 'img/face3.png',
			img:'img/item_product3.png',
			spec:'300kr',
			name1: 'Dress',
			heart: true,
			name2: 'Skarpnack, Stockholm',
			rank: 4
		}]
	},{
		id: 4,
		name: 'TV 200kr',
		type: 4,
		lat: 59.340879,
		log: 18.066445,
		items: [{
			photo: 'img/face4.png',
			img:'img/item_product4.png',
			spec:'200kr',
			name1: 'TV',
			heart: true,
			name2: 'Skarpnack, Stockholm',
			rank: 4
		}]
	},{
		id: 5,
		name: 'Vespa 400kr',
		type: 5,
		lat: 59.339343,
		log: 18.054731,
		items: [{
			photo: 'img/face5.png',
			img:'img/item_product5.png',
			spec:'400kr',
			name1: 'Vespa',
			heart: true,
			name2: 'Skarpnack, Stockholm',
			rank: 4
		}]
	},{
		id: 6,
		name: 'Windsurfing 500kr',
		type: 6,
		lat: 59.337107,
		log: 18.059529,
		items: [{
			photo: 'img/face6.png',
			img:'img/item_product6.png',
			spec:'500kr',
			name1: 'Windsurfing',
			name2: 'Skarpnack, Stockholm',
			heart: true,
			rank: 4
		}]
	}
	];

	function initialize() {

        var myLatlng = new google.maps.LatLng(59.342535,18.061964);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var iconBase = 'img/';
/*
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)',

        });
*/	
		// initialize marker images

		var images = [];

		for (var i = $scope.places.length - 1; i >= 0; i--) {

			var imgUrl = '';
			
			switch($scope.places[i].type) {
				case 1:
					imgUrl = iconBase + 'mark1.png';
					break;
				case 2:
					imgUrl = iconBase + 'mark2.png';
					break;
				case 3:
					imgUrl = iconBase + 'mark3.png';
					break;
				case 4:
					imgUrl = iconBase + 'mark4.png';
					break;
				case 5:
					imgUrl = iconBase + 'mark5.png';
					break;
				case 6:
					imgUrl = iconBase + 'mark6.png';
					break;
			}

			var image = {
				url: imgUrl,
				size: new google.maps.Size(30, 45),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(15, 45),
				scaledSize: new google.maps.Size(30, 45)
			}

			images.push(image);
		}
		
		console.log(images);

		// initialize label style

		var labelClasses = [];

		for (var i = $scope.places.length - 1; i >= 0; i--) {
			
			var labelClass = '';

			switch($scope.places[i].type) {
				case 1:
					labelClass = 'labels_green';
					break;
				case 2:
					labelClass = 'labels_yellow';
					break;
				case 3:
					labelClass = 'labels_yellow';
					break;
				case 4:
					labelClass = 'labels_green';
					break;
				case 5:
					labelClass = 'labels_yellow';
					break;
				case 6:
					labelClass = 'labels_yellow';
					break;
			}

			labelClasses.push(labelClass);
		}

		console.log(labelClasses);

		// add all of markers

		var markers = [];

		for (var i = $scope.places.length - 1; i >= 0; i--) {

			var pos = new google.maps.LatLng($scope.places[i].lat, $scope.places[i].log);

			var marker = new MarkerWithLabel({
	          position: pos,
	          map: map,
	          icon: images[i],
	          labelContent: $scope.places[i].name,
	          labelAnchor: new google.maps.Point(-10,41),
	          labelClass: labelClasses[i]
	        });

	        google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        	return function() {
	        		$scope.showItem(i);
	        	};
	        })(marker, i));

	        markers.push(marker);
		}

		console.log(markers);

        $scope.map = map;
      }

      initialize();

      google.maps.event.addDomListener(window, 'load', initialize);
      google.maps.event.addDomListener(window, "resize", function() {
      	var center = $scope.map.getCenter();
      	google.maps.event.trigger($scope.map, "resize");
      	$scope.map.setCenter(center);
      });
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
	  $scope.clickTest = function() {
	    alert('Example of infowindow with ng-click')
	  };
    
    $scope.showItem = function(index) {
    	document.getElementById("map").style.height = "50%";
    	$scope.flag = false;
    	initialize();
    	$scope.map.setCenter(new google.maps.LatLng($scope.places[index].lat, $scope.places[index].log));
    	console.log($scope.itemflag);

    	$scope.myItem = $scope.places[index];
    	$scope.$apply();
    	console.log($scope.myItems);
    }

    $scope.clickHeart = function(item) {
    	$scope.myItem.items[item].heart = !$scope.myItem.items[item].heart;
    	$scope.$apply();
    }
    $scope.changeFlag = function() {
    	$scope.flag = !$scope.flag;
    } 

	$scope.goItem=function() {
		$state.go('main.item');
	}

	$scope.goMulti=function() {
		$state.go('main.multi');
	}

	$scope.goMypos = function() {
		
	}

	$scope.goList = function() {
		$state.go('main.list');
	}
})