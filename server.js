// Dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require("express-handlebars");
var app = express();
var port = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve content from the public directory. 
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

require("./routes/api-routes.js")(app);
require('./routes/html-routes.js')(app);

// Start the express app.
    app.listen(port, function(){
        console.log("App listening on PORT " + port);
    });
