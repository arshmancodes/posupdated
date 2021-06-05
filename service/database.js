const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'bidding-application',
    password: ''
});

module.exports = pool.promise();