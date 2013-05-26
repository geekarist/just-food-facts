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
			expect(allFood.length).to.be.equal(5)
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
				{ name: '100% pur jus d\'orange', energy: 44, proteins: '0.7', carbohydrates: '9', fat: '0' },
				{ name: '100% pur jus d\'orange avec pulpe', energy: 48, proteins: '0.5', carbohydrates: '11', fat: '0.1' },
				{ name: '100% pur jus d\'orange d\'Espagne', energy: 47, proteins: '0.6', carbohydrates: '11.5', fat: '0' },
				{ name: 'Casino Bio 100% Pur jus d\'orange avec pulpe', energy: 48, proteins: '0.7', carbohydrates: '11', fat: '0' },
                { name: 'Jus d\'orange 100% pur fruit pressé', energy: 56, proteins:'0.9', carbohydrates:'12.5', fat:'0.2'}
                ])).to.be.equal(body)
            done()
		})
	})

    it('should only get the food whose energy is set', function(done) {
        // GIVEN
        var food = 'mozzarella di buffala campana'
        var host = 'http://localhost:3000'

        // WHEN
        request.get(host + '/api/get-food-facts?q=' + food, function(error, response, body) {
            var someFood = JSON.parse(body)

            // THEN
            expect(error).to.be.null
            expect(response.statusCode).to.equal(200)
            expect(someFood.length).to.be.equal(0)
            done()
        })
    })

    it('should find food whose name contains all words of name filter', function(done) {
        // GIVEN
        var food = 'tomates mozzarella'
        var host = 'http://localhost:3000'

        // WHEN
        request.get(host + '/api/get-food-facts?q=' + food, function(error, response, body) {
            var someFood = JSON.parse(body)

            // THEN
            expect(error).to.be.null
            expect(response.statusCode).to.equal(200)
            expect(someFood.length).to.be.equal(1)
            done()
        })
    })

    it('should return an exact match in first place', function(done) {
        // TODO
    })

    it('should ignore accents in search string', function(done) {
        // TODO
    })
})
