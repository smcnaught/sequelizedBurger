var Sequelize = require('sequelize');
var model = require('../config/connection.js');

var sequelizeBurger = model.define('sequelizeBurger', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    burger_name: {
        type: Sequelize.STRING,
    },

    devoured: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
    time: {
        type: Sequelize.DATE,
    },
});

sequelizeBurger.sync();

module.exports = sequelizeBurger;