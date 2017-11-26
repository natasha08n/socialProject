var express    = require('express');
var path       = require('path');
var favicon    = require('serve-favicon');
var logger     = require('morgan');
var users      = require('./http/controllers/users');
var port       = process.env.PORT || 3000;
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors');
app.use(cors());
app.use('/users', users);
app.use(logger('dev'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.all('*',function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
  next(); // http://expressjs.com/guide.html#passing-route control
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'my-app/dist/index.html'));
// });

// app.use( (req, res, next) => {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



var mysql            = require('mysql');
var dbconfig         = require('./config/database');
var connection       = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

app.get('/getcountries', function(req, res) {
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

app.get('/getcities', function(req, res) {
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

app.get('/getuniversities', function(req, res) {
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

app.get('/getschools', function(req, res) {
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

module.exports = app;