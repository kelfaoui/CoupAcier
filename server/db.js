const mysql = require("mysql2");
const dotenv = require("dotenv");

// Lire le contenur du fichier .env
dotenv.config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PWD, 
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

module.exports = db