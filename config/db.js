require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require("./config").development;

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        logging: false
    }
);

async function connectDatabase() {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Koneksi database berhasil");
}

module.exports = { sequelize, connectDatabase };