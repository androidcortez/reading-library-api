"use strict";

const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dateStrings: process.env.DB_DATE_STRING,
  database: process.env.DB_DATABASE,
  connectTimeout: 30000,
});

module.exports = pool;
