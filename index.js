require("dotenv").config();
const express = require("express");
const { connectDatabase } = require("./config/db");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routers/api"));

app.use((req, res) => {
    res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

app.use((err, req, res, next) => {
    console.error(err);
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ message: "Format JSON tidak valid" });
    }
    return res.status(err.status || 500).json({
        message: err.status ? err.message : "Terjadi kesalahan pada server"
    });
});
