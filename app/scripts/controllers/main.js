'use strict';

angular.module('justFoodFactsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.messages = messages

    $scope.$watch('foodFilter', function() {
        $http.get('/get-food-facts?q=' + $scope.foodFilter).success(function(data) {
            $scope.foodFacts = data
        }).error(function() {
            console.log('Error while getting food facts from backend!')
        })
    })

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
