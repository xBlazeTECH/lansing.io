var http = require('http'),
    mysql = require('mysql');

var mysql_conn = mysql.createConnection({
    socketPath: '/srv/run/mysqld/mysqld.sock',
    database: 'lansingio',
    user: 'lansingio',
    password: 'Lansing123!'
});

var test_mysql_conn = function(callback) {
    mysql_conn.connect(function(err) {
        if (err) {
            console.log(err.code);
            if (callback) callback("FAILED")
        } else {
            console.log('connected...');
            if (callback) callback("OK");
        }
    })
}

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello Node.js!\n');
    test_mysql_conn(function(mysql_status) {
        res.write('MySQL connection: ' + mysql_status + '\n');
        res.end();
    });
}).listen(process.env.PORT)