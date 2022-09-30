'use strict';

var express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql2');
var app = express();

var env = process.env.NODE_ENV || 'local';
var config = require('./config/config')[env];

const con = mysql.createConnection({
    host     : 'localhost', //RDSのエンドポイント
    user     : 'root', //MySQLのユーザ名
    password : 'admin01', //MySQLのパスワード
    database : 'nsy' //データベース名
  });

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/test', (req, res) => {
    res.send('Hello to VIS API');
});

app.post('/testPostSum', (req, res) => {
    var params = req.body;
    res.send('Ket qua la: ' + (+params.varA + +params.varB));
});

app.post('/testPostGetInfo', (req, res) => {
    var params = req.body;
    let sql = "select * from test where ID = '"+params.ID+"'";
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            console.log(result);
            console.log('Ket qua la: ' + result[0]["ID"] + '-'+result[0]["Pass"]);
            res.send(JSON.stringify(result[0]["ID"] + '-' + result[0]["Pass"]));
        }
        
    });
});

app.listen(app.get('port'), function () {
    console.log('Express started on ' + app.get('port'));
})