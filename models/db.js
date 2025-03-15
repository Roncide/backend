const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'root',
    database: 'cse'   
});

connection.connect(err=>{
    if (err) throw err;
    console.log('MySQL connected');
});

module.exports = connection