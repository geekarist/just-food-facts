var request = require('request')
var expect = require('chai').expect

describe('Warehouseman', function() {
	it('should get all food', function(done) {
		// GIVEN
		var food = ''
		var host = 'http://localhost:3000'

		// WHEN
		request.get(host + '/api/get-food-facts?q=' + food, function(error, response, body) {
			var allFood = JSON.parse(body)

			// THEN
			expect(error).to.be.null
			expect(response.statusCode).to.equal(200)
			expect(allFood.length).to.be.equal(10)
			done()
		})
	})

	it('should get some food', function(done) {
		// GIVEN
		var food = '100% pur jus d\'orange'
		var host = 'http://localhost:3000'

		// WHEN
		request.get(host + '/api/get-food-facts?q=' + food, function(error, response, body) {
			var someFood = JSON.parse(body)
			
			// THEN
			expect(error).to.be.null
			expect(response.statusCode).to.equal(200)
			expect(someFood.length).to.be.equal(5)
			expect(JSON.stringify([ 
				{ name: '100% pur jus d\'orange', energy: '183', proteins: '0.7', carbohydrates: '9', fat: '0' },
				{ name: '100% pur jus d\'orange avec pulpe', energy: '202', proteins: '0.5', carbohydrates: '11', fat: '0.1' },
				{ name: '100% pur jus d\'orange d\'Espagne', energy: '197', proteins: '0.6', carbohydrates: '11.5', fat: '0' },
				{ name: 'Casino Bio 100% Pur jus d\'orange avec pulpe', energy: '199', proteins: '0.7', carbohydrates: '11', fat: '0' },
				{ name: 'Pressade 100% pur jus d\'orange bio', energy: '187', proteins: '0.6', carbohydrates: '10.2', fat: '0.1' } 
				])).to.be.equal(body)
			done()
		})
	})
})
