const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host : env.host,
    dialect : env.dialect,
    port : env.dbPort,
    logging: console.log,
    pool: {
        max : env.max,
        min: env.min,
        acquire: env.acquire,
        idle: env.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bakery_item = require('../model/bakery_item.model.js')(sequelize, Sequelize);

module.exports = db;