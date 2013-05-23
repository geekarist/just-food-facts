'use strict'

describe('Controller: MainCtrl', function () {

	var ALL_FOOD_FACTS = [
	{name: 'Mozzarella', energy: '300', proteins: '13', carbohydrates: '8', fat: '45'},
	{name: 'Pizza à la mozzarella', energy: '160', proteins: '8', carbohydrates: '9', fat: '12'},
	{name: 'Tomate mozzarella', energy: '50', proteins: '4', carbohydrates: '3', fat: '9'},
	{name: 'Pain au maïs', energy: '100', proteins: '3', carbohydrates: '40', fat: '5'}
	]

	var SOME_FOOD_FACTS = [
	{name: 'Mozzarella', energy: '300', proteins: '13', carbohydrates: '8', fat: '45'},
	{name: 'Pizza à la mozzarella', energy: '160', proteins: '8', carbohydrates: '9', fat: '12'},
	{name: 'Tomate mozzarella', energy: '50', proteins: '4', carbohydrates: '3', fat: '9'}
	]

	var backendHost = "http://localhost:4000"

	var $httpBackend
	var mainCtrl
	var scope

	beforeEach(function() {
		module('justFoodFactsApp')
		inject(function ($controller, $rootScope, $injector) {
			$httpBackend = $injector.get('$httpBackend');
			scope = $rootScope.$new()
			mainCtrl = $controller('MainCtrl', {
				$scope: scope
			})
		})
	})

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should attach a list of awesomeThings to the scope', function () {
		expect(scope.awesomeThings.length).toBe(3)
	})

	it('should contain a help message for search', function() {
		// GIVEN
		// WHEN
		var helpMsg = scope.messages.help.search
		// THEN
		expect(helpMsg).toBeDefined()
	})

	it('should get all food facts on first load', function() {
		// GIVEN
		$httpBackend.expectGET(backendHost + '/get-food-facts?q=');
		$httpBackend.when('GET', backendHost + '/get-food-facts?q=').respond(ALL_FOOD_FACTS);

		// WHEN
		scope.foodFilter = ''

		scope.$digest()
		$httpBackend.flush()

		// THEN
		expect(scope.foodFacts).toEqual(ALL_FOOD_FACTS)
	})

	it('should get all food facts from backend when food filter is updated to an empty value', function(done) {
		// GIVEN
		scope.foodFilter = 'mascarpone'
		$httpBackend.expectGET(backendHost + '/get-food-facts?q=');
		$httpBackend.when('GET', backendHost + '/get-food-facts?q=').respond(ALL_FOOD_FACTS);

		// WHEN
		scope.foodFilter = ''

		scope.$digest()
		$httpBackend.flush()

		// THEN
		expect(scope.foodFacts).toEqual(ALL_FOOD_FACTS)
	})

	it('should get some food facts from backend when food filter is updated to an non empty value', function(done) {
		// GIVEN
		$httpBackend.expectGET(backendHost + '/get-food-facts?q=mozzarella');
		$httpBackend.when('GET', backendHost + '/get-food-facts?q=mozzarella').respond(SOME_FOOD_FACTS);

		// WHEN
		scope.foodFilter = 'mozzarella'

		scope.$digest()
		$httpBackend.flush()

		// THEN
		expect(scope.foodFacts).toEqual(SOME_FOOD_FACTS)
	})

})
