// import orm.js into burger.js
var orm = require('../config/orm.js');
 
// Call the ORM functions using burger specific input for the ORM.
var burgers = {
    all: function (cb) {
        orm.all("burgers", function (res) {
            cb(res);
        });
    },
    create: function (cols, vals, cb) {
        orm.create("burgers", cols, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.update("burgers", objColVals, condition, function (res) {
            cb(res);
        });
    }
};

// Export burgers at the end of the burger.js file.
module.exports = burgers;
