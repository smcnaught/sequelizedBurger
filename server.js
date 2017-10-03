// Dependencies
var express = require('express');
var Sequelize = require('sequelize');
var models = require('./models');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require("express-handlebars");
var app = express();
var port = process.env.PORT || 3000;
var routes = require('./controllers/burgers_controllers.js');

app.use('/', routes);

var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve content from the public directory. 
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Start the express app.
// db.sequelize.sync({ force: true }).then(function(){
    app.listen(port, function () {
        console.log("App listening on PORT " + port);
    });
// })