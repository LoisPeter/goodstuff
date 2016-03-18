angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$ionicConfigProvider.tabs.position('top');
	  // Ionic uses AngularUI Router which uses the concept of states
	  // Learn more here: https://github.com/angular-ui/ui-router
	  // Set up the various states which the app can be in.
	  // Each state's controller can be found in controllers.js
	  $stateProvider
	        
	    .state('home', {
	      url: '/home',
	      templateUrl: 'templates/home.html',
	      controller: 'homeCtrl'
	    })

	    .state('login', {
	      url: '/login',
	      templateUrl: 'templates/login.html',
	      controller: 'loginCtrl'
	    })

	    .state('forgot', {
	      url: '/forgot',
	      templateUrl: 'templates/forgot.html',
	      controller: 'forgotCtrl'
	    })

	    .state('main', {
	      url: '/main',
	      abstract:true,
	      templateUrl: 'templates/menu.html',
	      controller: 'menuCtrl'
	    })

	    .state('main.register', {
	      url: '/register',
	      views: {
	      	'menuContent': {
	      		templateUrl: 'templates/register.html',
	      		controller: 'registerCtrl'
	      	}
	      }
	    })
	  // if none of the above states are matched, use this as the fallback
	  $urlRouterProvider.otherwise('/home');

});