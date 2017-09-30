// Dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var exphbs = require("express-handlebars");

var port = process.env.PORT || 3000;
var app = express();

// Serve content from the public directory. 
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes & give server access. 
var routes = require("./controllers/burgers_controllers.js");

app.use("/", routes);

app.listen(port);