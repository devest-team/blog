const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.blog = require('./blog')(sequelize, Sequelize);
db.user = require('./user')(sequelize, Sequelize);

module.exports = db;