var express   = require('express');
var app       = module.exports = express();
var fs        = require('fs');
var path      = require('path');

app.get('/api/bower', function(req, res) {
	res.send(fs.readFileSync(__dirname + '/../../../bower.json'));
});

app.get('/api/package', function(req, res) {
	res.send(fs.readFileSync(__dirname + '/../../../package.json'));
});

var allFoods = []

console.log('Loading open food facts data...')
fs.readFile(__dirname + '/../../data/openfoodfacts_search.csv', 'UTF-8', function(error, data) {
    if (error) {
        throw error
    }
    var lines = data.split('\n')
	console.log(lines.length + ' lines have been read')

	var attrNames
	lines.forEach(function(element, index) {
		var lineRecords = element.split('\t')
		if (index === 0) {
			attrNames = lineRecords
		} else {
			var food = {}
			lineRecords.forEach(function(element, index) {
				food[attrNames[index]] = element
			})
			var prettyFood = {
				name: food.product_name,
				energy: Math.round(food.energy_100g * 0.2388),
				proteins: food.proteins_100g,
				carbohydrates: food.carbohydrates_100g,
				fat: food.fat_100g
			}
			if (prettyFood.name && prettyFood.energy) {
                allFoods.push(prettyFood)
            }
		}
	})
	console.log(allFoods.length + ' foods have been stored')
})

var containsAll = function(str, array) {
    var found = true
    for (var i = 0; i < array.length; i++) {
        if (str.indexOf(array[i]) == -1) {
            return false
        }
    }
    return found
}

var UNACCENTED_CHARS = {
	'é': 'e',
	'è': 'e',
	'ç': 'c',
	'à': 'a',
	'â': 'a',
	'ê': 'e',
	'î': 'i',
	'ô': 'o',
	'û': 'u',
	'ä': 'a',
	'ë': 'e',
	'ü': 'u',
	'ï': 'i',
	'ö': 'o',
	'ù': 'u'
}

app.get('/api/get-food-facts', function(request, response) {
	var nameFilter = request.query.q
	var someFood = allFoods.filter(function(element) {
		var lowerNameFilter = unescape(nameFilter).toLowerCase().replace(/[éèçàùâêîôûäëüïöù]/g, function(match) {
			return UNACCENTED_CHARS[match]
		})
		var lowerName = (element.name || '').toLowerCase()
        var lowerNameFilterWords = lowerNameFilter.split(/ +/)
        return containsAll(lowerName, lowerNameFilterWords)
	})
	someFood = someFood.slice(0, 5)
	var body = JSON.stringify(someFood);
	response.setHeader('Content-type', 'application/json');
	response.end(body);
});

