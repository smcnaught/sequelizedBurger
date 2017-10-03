var path = require('path');
var model = require('../models/burger.js');


module.exports = function(app) {

    app.post('/add', function(request, response) {

        if (request.body.burger_name) {
            model.create({ burger_name: request.body.burger_name })
                .then(function() {
                    response.redirect('/');
                });
        }
    });

    app.put('/eat', function(request, response) {
        model.update(

            {
                devoured: 1
            },

            {
                where: {
                    id: request.body.burgerId
                }
            }
        ).then(function() {
            response.redirect('/');
        })
    });
};