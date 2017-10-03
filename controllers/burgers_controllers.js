// Node dependencies
var express = require('express');
var router = express.Router();
var models = require('../models');

var sequelizeConnection = models.sequelize;

sequelizeConnection.sync();

router.get('/', function (req, res) {
    res.redirect('/index');
});

// Index Page (render all burgers to DOM)
router.get('/index', function (req, res) {

    // Sequelize Query to get all burgers from database (and join them to their devourers, if applicable)
    models.burgers.findAll({
        include: [{ model: models.devourers }]
    }).then(function (data) {

        // Pass the returned data into a Handlebars object and then render it
        var hbsObject = { burgers: data };
        // console.log(data);
        res.render('index', hbsObject);

    })

});


// Create a New Burger
router.post('/burger/create', function (req, res) {

    // Sequelize Query to add new burger to database
    models.burgers.create(
        {
            burger_name: req.body.burger_name,
            devoured: false
        }
    ).then(function () {
        // After the burger is added to the database, refresh the page
        res.redirect('/index');
    });

});



// Devour a Burger
router.post('/burger/eat/:id', function (req, res) {

    // If not name was added, make it "Anonymous"
    if (req.body.burgerEater == "" || req.body.burgerEater == null) {
        req.body.burgerEater = "Anonymous";
    }

    // Create a new burger devourer (and also associate it to the eaten burger's id)
    models.devourers.create({
        devourer_name: req.body.burgerEater,
        burgerId: req.params.id
    })

        // Then, select the eaten burger by it's id
        .then(function (newDevourer) {

            models.burgers.findOne({ where: { id: req.params.id } })

                // Then, use the returned burger object to...
                .then(function (eatenBurger) {
                    // ... Update the burger's status to devoured
                    eatenBurger.update({
                        devoured: true,
                    })

                        // Then, the burger is devoured, so refresh the page
                        .then(function () {
                            res.redirect('/index');
                        });

                });

        });

});

// ----------------------------------------------------


// Export routes
module.exports = router; F