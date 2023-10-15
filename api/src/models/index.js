const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../db/config/config');
//const env = process.env.NODE_ENV || 'development';

const db = {};
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  dialect: 'mysql',
  host: config.development.options.host,
});

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;