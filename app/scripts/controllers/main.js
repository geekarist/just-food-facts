'use strict';

angular.module('justFoodFactsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.messages = messages

    $scope.foodFacts = [
        {name: 'Mozzarella', energy: '300', proteins: '13', carbohydrates: '8', fat: '45'},
        {name: 'Pizza à la mozzarella', energy: '160', proteins: '8', carbohydrates: '9', fat: '12'},
        {name: 'Tomate mozzarella', energy: '50', proteins: '4', carbohydrates: '3', fat: '9'}
    ]

    // TODO: Use $scope.$watch to get food facts from backend on search filter modification

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
