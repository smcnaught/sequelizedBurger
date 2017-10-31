// Dependencies
var express = require('express');
var Sequelize = require('sequelize');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require("express-handlebars");
var app = express();
var port = 'process.env.postgres://btwcmagfslqszr:f469f09a62d9b1758c84429f576ee8a55c3149e0efb8fe2d4f8b456bda886a2a@ec2-54-221-229-64.compute- 1.amazonaws.com:5432 / d4qrpr8uc8u45s' || 3000;
var routes = require('./controllers/burgers_controllers.js');

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

app.use('/', routes);

// Start the express app.
db.sequelize.sync().then(function(){
    app.listen(port, function () {
        console.log("App listening on PORT " + port);
    });
})