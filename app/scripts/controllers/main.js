'use strict'

angular.module('justFoodFactsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.messages = messages

    var backendHost = 'http://localhost:4000'

    $scope.$watch('foodFilter', function() {
        $http.get(backendHost + '/get-food-facts?q=' + $scope.foodFilter).success(function(data) {
            $scope.foodFacts = data
        }).error(function() {
            console.log('Error while getting food facts from backend!')
        })
    })

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ]
  })
