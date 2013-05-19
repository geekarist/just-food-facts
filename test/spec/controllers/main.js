'use strict'

describe('Controller: MainCtrl', function () {

	var ALL_FOOD_FACTS = [
		{name: 'Mozzarella', energy: '300', proteins: '13', carbohydrates: '8', fat: '45'},
		{name: 'Pizza à la mozzarella', energy: '160', proteins: '8', carbohydrates: '9', fat: '12'},
		{name: 'Tomate mozzarella', energy: '50', proteins: '4', carbohydrates: '3', fat: '9'}
	]

	// load the controller's module
	beforeEach(module('justFoodFactsApp'))

	var MainCtrl, scope

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new()
		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		})
	}))

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

	it('should contain all food facts', function() {
		// GIVEN
		// WHEN
		var foodFacts = scope.foodFacts
		// THEN
		expect(foodFacts).toEqual(ALL_FOOD_FACTS)
	})

	it('should fetch food facts from backend when food filter is updated', function(done) {
		// GIVEN
		scope.foodFilter = 'mascarpone'
		// Given empty search, backend will get all food facts

		// WHEN
		scope.foodFilter = ''

		// THEN
		expect(scope.foodFacts).toEqual(ALL_FOOD_FACTS)
	})

})
