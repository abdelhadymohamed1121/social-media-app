const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'social_app'
});


module.exports = connection;