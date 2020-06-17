var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dateStrings: process.env.DB_DATE_STRING,
    database: process.env.DB_DATABASE,
    connectTimeout: 30000
});

connection.connect((err) => {
    if (err) throw err.stack;
    console.log("Database Connected");
});

module.exports = connection;