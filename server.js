const express = require('express')
const app = express()

var db = require('./db');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// select function

app.get('/', function (req, res) {

    db.query('SELECT * from user_details limit 6', function (err, rows, fields) {
        if (err) throw err
        res.json(rows);
    })   
})

// insert function

app.post('/create', function (req, res) {

    var sql = "insert into user_details (username,first_name,last_name,gender,password,status)values ?";
    var values = [[req.body.name,req.body.fn,req.body.ln,req.body.g,req.body.pass,req.body.stat]];
    db.query(sql,[values], function (err, rows, fields) {
        if (err) throw err
        res.send("row insert sucessfully");
    })  


})

//update function

app.put('/update', function (req, res) {

    var sql = "update user_details SET username = ?,last_name = ? WHERE user_id = ?";
    var values = [req.body.name,req.body.ln,500];
    db.query(sql,values, function (err, rows, fields) {
        if (err) throw err
        res.send("row updated sucessfully");
    }) 
})

//delete function

app.delete('/delete/:Id', function (req, res) {

    var sql = "delete from user_details WHERE user_id = ?";
    var values = req.params.Id;
    db.query(sql,values, function (err, rows, fields) {
        if (err) throw err
        res.send("row updated sucessfully");
    }) 
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})