const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'meemuski_pos',
//     database: 'meemuski_pos',
//     password: 'pos123'
// });


// LOCAL HOST
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'pos',
    password: ''
});


// OUR DATABASE

// const pool = mysql.createPool({
//     host: '170.249.211.50',
//     user: 'codemine_pos',
//     port: 3306,
//     database: 'codemine_pos',
//     password: 'pos123456',
//     insecureAuth: true
// });

module.exports = pool.promise();