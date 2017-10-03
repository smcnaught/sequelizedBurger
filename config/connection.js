var Sequelize = require('sequelize');

var source = {
    localhost: {
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'burgers_db'
    },
    jawsDB: {
        port: 3306,
        host: 'cdm1s48crk8itlnr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'wnluf9sdtyh6fdw1',
        password: 'ck6cjje8r5tdhzcd',
        database: 'burgers_db'
    }
};

var selectedSource = source.jawsDB;
// var selectedSource = source.localhost;

var sequelize = new Sequelize(selectedSource.database, selectedSource.user, selectedSource.password, {
    host: selectedSource.host,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

module.exports = sequelize;