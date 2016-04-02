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
    /*=====Main -> calendar====*/
    .state('main', {
      url: '/main',
      abstract:true,
      templateUrl: 'templates/menu.html',
      controller: 'MainCtrl'
    })

    .state('main.content', {
      url:'/main_content',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller:'ContentCtrl'
        }
      }
    })

    /*==Main-> Citas Pendients==*/
    .state('main.citasPendient', {
      url:'/citasPendient',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/citasPendient.html',
          controller:'PendientCtrl'
        }
      }
    })

    /*====Main->Add Appointment===*/
    .state('main.addappointment', {
      url:'/addappointment',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/AddAppointment.html',
          controller:'AddAppointmentCtrl'
        }
      }
    })

    .state('main.addappointment.newclient', {
      url:'/newclient',
      cache:false,
      views: {
        'addtab': {
          templateUrl: 'templates/NewClient.html',
          controller:'NewClientCtrl'
        }
      }
    })

    .state('main.addappointment.existclient', {
      url:'/existclient',
      cache:false,
      views: {
        'existtab': {
          templateUrl: 'templates/ExistClient.html',
          controller:'ExistClientCtrl'
        }
      }
    })

    /*==Main -> Edit Appointment*/
    .state('detail', {
      url: '/detail',
      cache: false,
      templateUrl: 'templates/detail.html',
      controller: 'DetailCtrl'
    })
    /*==categories -> new category*/
    .state('newcategory', {
      url: '/newcategory',
      templateUrl: 'templates/NewCategory.html',
      controller: 'NewCategoryCtrl'
    })
    /*==categories -> service*/
    .state('service', {
      url: '/service',
      templateUrl: 'templates/Service.html',
      controller: 'ServiceCtrl'
    })
    /*==services -> new service*/
    .state('newservice', {
      url: '/newservice',
      templateUrl: 'templates/NewService.html',
      controller: 'NewServiceCtrl'
    })
    /**==Main -> Customers==**/
    .state('main.customers', {
        url:'/customers',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/Customers.html',
                controller:'CustomersCtrl'
            }
        }
    })

    /*===Customers -> Edit Customer==*/
    .state('editcustomer', {
      url: '/editcustomer',
      params:{myindex: null},
      cache: false,
      templateUrl: 'templates/EditCustomer.html',
      controller: 'EditCustomerCtrl'
    })

    .state('editcustomer.data', {
      url:'/customerdata',
      views: {
        'datatab': {
          templateUrl: 'templates/CustomerData.html',
          controller:'CustomerDataCtrl'
        }
      }
    })
    .state('editcustomer.history', {
      url:'/customerhistory',
      views: {
        'historytab': {
          templateUrl: 'templates/CustomerHistory.html',
          controller:'CustomerHistoryCtrl'
        }
      }
    })
    /*===Customers -> Add Customer==*/
    .state('addcustomer', {
      url: '/addcustomer',
      cache: false,
      templateUrl: 'templates/AddCustomer.html',
      controller: 'AddCustomerCtrl'
    })
    /*===Main -> Services ====*/
    .state('main.categories', {
      url: '/categories',
        views: {
          'menuContent': {
            templateUrl: 'templates/Categories.html',
            controller: 'CategoriesCtrl'    
          }
        }
    })
    /**==Main -> Adjustment==**/
    .state('main.adjustment', {
        url:'/adjustment',
        views: {
          'menuContent': {
            templateUrl: 'templates/Adjustment.html',
            controller: 'AdjustmentCtrl'    
          }
        }
    })

    .state('main.adjustment.data', {
      url:'/adjustmentdata',
      views: {
        'datatab': {
          templateUrl: 'templates/AdjustmentData.html',
          controller:'AdjustmentDataCtrl'
        }
      }
    })

    .state('main.adjustment.photo', {
      url:'/adjustmentphoto',
      views: {
        'phototab': {
          templateUrl: 'templates/AdjustmentPhoto.html',
          controller:'AdjustmentPhotoCtrl'
        }
      }
    })

    .state('main.adjustment.schedule', {
      url:'/adjustmentschedule',
      views: {
        'scheduletab': {
          templateUrl: 'templates/AdjustmentSchedule.html',
          controller:'AdjustmentScheduleCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});