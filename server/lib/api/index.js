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
fs.readFile(__dirname + '/../../data/openfoodfacts_search.csv', {encoding: 'UTF-8'}, function(error, data) {
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
				energy: food.energy_100g,
				proteins: food.proteins_100g,
				carbohydrates: food.carbohydrates_100g,
				fat: food.fat_100g
			}
			allFoods.push(prettyFood)
		}
	})
	console.log(allFoods.length + ' foods have been stored')
})

app.get('/api/get-food-facts', function(request, response) {
	var nameFilter = request.query.q
	var someFood = allFoods.filter(function(element) {
		var upperNameFilter = unescape(nameFilter).toUpperCase()
		var upperName = (element.name || '').toUpperCase()
		if (upperName.indexOf(upperNameFilter) != -1) {
			return true
		}
		return false
	})
	someFood = someFood.slice(0, 10)
	var body = JSON.stringify(someFood);
	response.setHeader('Content-type', 'application/json');
	response.end(body);
});

