const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'meemuski_pos',
//     database: 'meemuski_pos',
//     password: 'pos123'
// });


// LOCAL HOST
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'pos',
//     password: ''
// });


// OUR DATABASE

const pool = mysql.createPool({
    host: 'https://server2.needcloudhost.com:2222/user/database/codemine_pos',
    user: 'codemine_pos',
    database: 'codemine_pos',
    password: 'pos123456',
    insecureAuth: true
});

module.exports = pool.promise();