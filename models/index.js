var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

if ('process.env.postgres://btwcmagfslqszr:f469f09a62d9b1758c84429f576ee8a55c3149e0efb8fe2d4f8b456bda886a2a@ec2-54-221-229-64.compute- 1.amazonaws.com:5432 / d4qrpr8uc8u45s') {
  // the application is executed on Heroku ... use the postgres database
  var sequelize = new Sequelize('process.env.postgres://btwcmagfslqszr:f469f09a62d9b1758c84429f576ee8a55c3149e0efb8fe2d4f8b456bda886a2a@ec2-54-221-229-64.compute- 1.amazonaws.com:5432 / d4qrpr8uc8u45s', {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: true //false
  })
} else {
  // the application is executed on the local machine ... use mysql
  var sequelize = new Sequelize('burgerdatabase', 'root', null)
  //sequelize = new Sequelize(config.database, config.username, config.password, config);
}



fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
