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

app.get('/api/get-food-facts', function(request, response) {
        var body = JSON.stringify([
        {name: 'Mozzarella', energy: '300', proteins: '13', carbohydrates: '8', fat: '45'},
        {name: 'Pizza à la mozzarella', energy: '160', proteins: '8', carbohydrates: '9', fat: '12'},
        {name: 'Tomate mozzarella', energy: '50', proteins: '4', carbohydrates: '3', fat: '9'},
        {name: 'Pain au maïs', energy: '100', proteins: '3', carbohydrates: '40', fat: '5'}
        ]);
        response.setHeader('Content-type', 'application/json');
        response.end(body);
});

