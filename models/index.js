const fs = require("fs");
const path = require("path");
const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const db = {};

fs.readdirSync(__dirname)
    .filter((file) => file !== "index.js" && file.endsWith(".js"))
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = require("sequelize");

module.exports = db;
