var mysql = require('mysql')

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database:'dbrest'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Connect');
})

module.export = conn;