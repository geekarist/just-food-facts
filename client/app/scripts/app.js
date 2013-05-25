angular
  .module('app', [])
  .config(['$routeProvider', function($router) {
    $router
      .when('/home', {
        controller:   'homeController',
        templateUrl:  'app/templates/home.html'
      })
      .when('/', {
        templateUrl: 'app/templates/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
;
