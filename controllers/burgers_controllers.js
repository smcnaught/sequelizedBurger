var express = require('express');
var router = express.Router();
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var models = require('../models');

router.use(express.static(__dirname + '/public'));

// Extracts the sequelize connection from the models object
var sequelizeConnection = models.sequelize;

// Sync the tables
sequelizeConnection.sync();

router.get('/', function (req, res) {
    res.render('index');
});

// Index Page - initial render to the DOM.
router.get('/index', function (req, res) {
    models.burgers.findAll({}).then(function (data) {
        var hbsObject = { burgers: data }
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/burgers/create', function (req, res) {
    console.log(req.body);
    models.burgers.create({ burger_name: req.body.burg_name }).then(function (data) {
        res.redirect('/');
    })
});

router.post('/burger/eat/:id', function (req, res) {
    burgers.update({ devoured: req.body.devoured }, {
        fields: ['devoured'],
        where: { id: req.params.id }
    }).then(function (data) {
        res.redirect('/index');
    });
});

module.exports = router;