'use strict';

angular.module('justFoodFactsApp', [])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    // See https://github.com/angular/angular.js/pull/1454#issuecomment-10406965
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
  });

