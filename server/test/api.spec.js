var request = require('request')
var expect = require('chai').expect

describe('Warehouseman', function() {
	it('should get food', function(done) {
		// GIVEN
		var food = 'mozza'
		var host = 'http://localhost:3000'

		// WHEN
		request.get(host + '/api/get-food-facts?q=' + food, function(error, response, body) {

			// THEN
			expect(error).to.be.null
			expect(response.statusCode).to.equal(200)
			expect(body).to.be.equal(JSON.stringify([
				{name: 'Mozzarella', energy: '300', proteins: '13', carbohydrates: '8', fat: '45'},
				{name: 'Pizza à la mozzarella', energy: '160', proteins: '8', carbohydrates: '9', fat: '12'},
				{name: 'Tomate mozzarella', energy: '50', proteins: '4', carbohydrates: '3', fat: '9'},
				{name: 'Pain au maïs', energy: '100', proteins: '3', carbohydrates: '40', fat: '5'}
				]))
			done()
		})
	})
})
