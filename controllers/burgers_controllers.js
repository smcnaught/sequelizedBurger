// Inside the burgers_controller.js file, import 
// the following: Express, burger.js
var express = require('express');
var burgers = require('../models/burger.js');
var router = express.Router();

// Create the router for the app, and export 
// the router at the end of your file.

router.get('/', function(req, res){
	res.redirect('/burgers')
});

router.get('/burgers', function(req, res){
	burgers.all(function(data){
		var hbsObject = {burgers: data};

		console.log(hbsObject);

		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function(req, res){
	burgers.create(['burger_name'], [req.body.burg_name], function(data){
		res.redirect('/burgers')
	});
});

router.put('/burgers/update/:id', function(req, res){
	var condition = 'id = ' + req.params.id;

	console.log('condition ', condition);

	burgers.update({'devoured': req.body.devoured}, condition, function(data){
		res.redirect('/burgers');
	});
});

module.exports = router;
// router.get("/", function (req, res) {
//     burger.all(function (data) {
//         var hbsObject = {
//             burgers: data
//         };
//         console.log(hbsObject);
//         res.render("index", hbsObject);
//     });
// });

// router.post("/burgers/create", function (req, res) {
//     burger.create([
//         "burger_name", "devoured"
//     ], [
//             req.body.burger_name, req.body.devoured
//         ], function () {
//             res.redirect("/");
//         });
// });

// router.put("/burgers/update/:id", function (req, res) {
//     var condition = "id = " + req.params.id;

//     console.log("condition", condition);

//     burger.update({
//         devoured: req.body.devoured
//     }, condition, function () {
//         res.redirect("/");
//     });
// });

// router.delete("/:id", function (req, res) {
//     var condition = "id = " + req.params.id;

//     burger.delete(condition, function () {
//         res.redirect("/");
//     });
// });

// Export routes for server.js to use.
// module.exports = router;
