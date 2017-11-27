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

router.get('/checkstate', auth, (req, res) => {
    console.log('callback');
    let content = {
        success: true,
        message: 'Successfully logged in'
    };
    res.send(content);
})

router.post('/register', (req, res) => {
    console.log("reqUser-----------------------------------------");

    var reqUser = req.body;
    console.log(reqUser);
    console.log("true-----", Object.keys(reqUser).length === 0);
        process.nextTick(() => {
            if (Object.keys(reqUser).length === 0) {
                console.log("reqUser");
                let content = getReplyObject(false, "Please, enter information about yourself.");
                res.send(content);
                return;
            }
            else if (reqUser.username.length < 4 || reqUser.username.length > 45) {
                console.log("username");
                let content = getReplyObject(false, "Username is not valid. It should be between 4 and 45 characters long.");
                res.send(content);
                return;
            }
            else if (reqUser.password.length < 6 || reqUser.password.length > 60) {
                console.log("password");
                let content = getReplyObject(false, "Password is not valid. It should be between 6 and 60 characters long.");
                res.send(content);
                return;
            }
            else if (reqUser.email.length == 0) {
                console.log("email");
                let content = getReplyObject(false, "Email is not valid.");
                res.send(content);
                return;
            }
            else if (reqUser.gender.length == 0) {
                let content = getReplyObject(false, "Gender is required.");
                res.send(content);
                return;
            }
            else if (!reqUser.country || !reqUser.city || !reqUser.school || !reqUser.university) {
                let content = getReplyObject(false, "Country, city, school and university is required.");
                res.send(content);
                return;
            }
            else if (!(reqUser.bday instanceof Date)) {
                let content = getReplyObject(false, "Date of your birthday is not valid.");
                res.send(content);
                return;
            }
        console.log('function-signup');
        let queryF = "SELECT * FROM users WHERE username = '" + reqUser.username + "' ";
        connection.query(queryF, function (err, rows) {
            if (err) {
                res.send(err);
                return;
            }
            if (rows.length) {
                let content = getReplyObject(false, "User already exists");
                res.send(content);
                return;
            } else {
                var newUser = {
                    username: reqUser.username,
                    password: bcrypt.hashSync(reqUser.password, null, null),
                    country: reqUser.country,
                    city: reqUser.city,
                    birthDate: reqUser.bday,
                    email: reqUser.email,
                    school: reqUser.school,
                    university: reqUser.university,
                    gender: reqUser.gender
                };
                var insertQuery = `INSERT INTO users ( username, password, country, city, birthDate, school, university, gender, email ) values ('${newUser.username}', '${newUser.password}', '${newUser.country}', '${newUser.city}', '${newUser.birthDate}', '${newUser.school}', '${newUser.university}', '${newUser.gender}', '${newUser.email}')`;
                connection.query(insertQuery, function (err, rows) {
                if (err) {
                    throw err;
                }
                console.log('in token')
                let token = jwt.sign(newUser, config.secret, {
                    expiresIn: 60 * 60 * 24
                })
                let content = {
                    user: newUser,
                    success: true,
                    message: 'You created a new user',
                    token: token
                };
                console.log('content', content);
                res.send(content);
                // return
                })
            }
        })
    })
})

router.post('/login', (req, res) => {
    console.log('-------------------------function-login');
    var reqUser = req.body;
    if (!reqUser) {
        let content = getReplyObject(false, "Please, enter information about yourself.");
        res.send(content);
        return;
    }
    else if (reqUser.username.length < 4 || reqUser.username.length > 45) {
        let content = getReplyObject(false, "Username is not valid. It should be between 4 and 45 characters long.");
        res.send(content);
        return;
    }
    else if (reqUser.password.length < 6 || reqUser.password.length > 60) {
        let content = getReplyObject(false, "Password is not valid. It should be between 6 and 60 characters long.");
        res.send(content);
        return;
    }
    let queryLogin = `SELECT users.username, users.password, users.email, users.gender, users.birthDate, universities.name AS 'country', schools.name AS 'school', countries.name AS 'country', cities.name AS 'city' FROM users INNER JOIN universities ON users.university = universities.id INNER JOIN schools ON users.school = schools.id INNER JOIN countries ON users.country = countries.id INNER JOIN cities ON users.city = cities.id WHERE users.username = '${reqUser.username}'`
    connection.query(queryLogin, function (err, rows) {
        if (err) {
            console.log('error', error);
            res.send(err);
            return;
        }
        if (rows.length === 0) {
            let content = getReplyObject(false, "User does not exists");
            res.send(content);
            return;
        }
        if (!bcrypt.compareSync(reqUser.password, rows[0].password)) {
            let content = getReplyObject(false, "Incorrect password");
            res.send(content);
            return;
        }
        reqUser = rows[0]
        let token = jwt.sign(reqUser, config.secret, {
            expiresIn: 60 * 60 * 24
        });
        let content = {
            user: reqUser,
            success: true,
            message: 'You logged in',
            token: token
        };
        console.log('i am send_content');
        res.send(content);
    });
})

function getReplyObject(status, message) {
    if (message.length === 0){
        return {status, message : "unknown reasons"};
    }
    return { status, message };
} 

module.exports = router;