const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT;

var mysql_connected;
var mysql_error;

var mysql_conn = mysql.createConnection({
    socketPath: '/srv/run/mysqld/mysqld.sock',
    database: 'lansingio',
    user: 'lansingio',
    password: 'Lansing123!'
});

mysql_conn.connect(function(err) {
    if (err) {
        mysql_connected = false;
        mysql_error = err.code;
    } else {
        mysql_connected = true;
    }
});

var test_mysql_conn = function() {
    if (mysql_connected = false) {
        return "Failed: " + mysql_error;
    } else {
        return "OK!";
    }
}

app.get('/', (req, res) => res.send('Hello World!'));

app.get("/sqltest", (req, res) => res.send("MySQL Connection: " + test_mysql_conn() + '\n'));

app.listen(port, () => console.log('Website is running on port ${port}!'));