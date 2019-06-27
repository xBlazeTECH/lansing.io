const express = require('express');
const mysql = require('mysql');

const app = express()
const port = process.env.PORT

var mysql_conn = mysql.createConnection({
    socketPath: '/srv/run/mysqld/mysqld.sock',
    database: 'lansingio',
    user: 'lansingio',
    password: 'Lansing123!'
});

var test_mysql_conn = function() {
    mysql_conn.connect(function(err) {
        if (err) {
            console.log(err.code);
            return "FAILED";
        } else {
            console.log('connected...');
            return "OK";
        }
    });
}

app.get('/', (req, res) => res.send('Hello World!'));

app.get("/sqltest", (req, res) => res.send("MySQL Connection: " + test_mysql_conn() + '\n'));

app.listen(port, () => console.log('Website is running on port ${port}!'));