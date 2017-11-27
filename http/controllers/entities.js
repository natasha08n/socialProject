var express   = require('express');
var app       = express();
var router    = express.Router();
var jwt       = require('jsonwebtoken');
var config    = require('../middleware/token');
var auth      = require('../middleware/auth');
var bcrypt    = require('bcrypt-nodejs');

var mysql      = require('mysql');
var dbconfig   = require('../../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
console.log('conn', dbconfig.database);

router.get('/getcountries', function(req, res) {
    console.log("function-getcountries");
    connection.query("SELECT * from countries", function(err, rows){
        console.log("I know query-countries, I sent request to DB");
        if(err){
            return;
        }
        if(rows.length){
            console.log("rows", rows);
            res.status(200).json(rows);
        }
    })
  });
  
  router.get('/getcities', function(req, res) {
    console.log("function-getcities");
    connection.query("SELECT * from cities", function(err, rows){
        console.log("I know query-cities, I sent request to DB");
        if(err){
            return;
        }
        if(rows.length){
            console.log("rows", rows);
            res.status(200).json(rows);
        }
    })
  });
  
  router.get('/getuniversities', function(req, res) {
    console.log("function-getuniversities");
    connection.query("SELECT * from universities", function(err, rows){
        console.log("I know query-universities, I sent request to DB");
        if(err){
            return;
        }
        if(rows.length){
            console.log("rows", rows);
            res.status(200).json(rows);
        }
    })
  });
  
  router.get('/getschools', function(req, res) {
    console.log("function-getschools");
    connection.query("SELECT * from schools", function(err, rows){
        console.log("I know query-schools, I sent request to DB");
        if(err){
            return;
        }
        if(rows.length){
            console.log("rows", rows);
            res.status(200).json(rows);
        }
    })
  });
  
  module.exports = router;