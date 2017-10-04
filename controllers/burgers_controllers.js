var express = require('express');
var app = express();
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var models = require('../models');

app.use(express.static(__dirname + '/public'));

// Extracts the sequelize connection from the models object
var sequelizeConnection = models.sequelize;

// Sync the tables
sequelizeConnection.sync();

app.get('/', function (req, res) {
    res.render('index');
});

// Index Page - initial render to the DOM.
app.get('/index', function (req, res) {
    models.burgers.findAll({}).then(function (data) {
        var hbsObject = { burgers: data }
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

app.post('/burger/create', function (req, res) {
    console.log(req.body);
    models.burgers.create({ burger_name: req.body.burger_name }).then(function (data) {
        res.redirect('/');
    })
});

app.post('/burger/eat/:id', function (req, res) {
    burgers.update({ devoured: req.body.devoured }, {
        fields: ['devoured'],
        where: { id: req.params.id }
    }).then(function (data) {
        res.redirect('/index');
    });
});

module.exports = app;