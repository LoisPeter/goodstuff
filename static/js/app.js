// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic',
 'app.routes',
 'app.services',
 'app.home',
 'app.main',
 'app.detail',
 'main.adjustment',
 'main.adjustment.data',
 'main.adjustment.photo',
 'main.adjustment.schedule',
 'app.editcustomer',
 'app.editcustomer.data',
 'app.editcustomer.history',
 'main.content',
 'main.pendient',
 'main.addappointment',
 'main.addappointment.newclient',
 'main.addappointment.existclient',
 'main.customers',
 'app.addcustomer',
 'main.categories',
 'app.newcategory',
 'app.service',
 'app.newservice'
  ])
.constant('ApiEndpoint', {
  url: 'http://localhost:8100/api'
  //url:'http://nuevo.restuento.com/api'
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
