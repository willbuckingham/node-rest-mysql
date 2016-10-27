// set variables for environment
var express     = require('express');
var router      = express.Router();
var app         = express();
var path        = require('path');
var bodyParser  = require('body-parser');

var mysql       = require('mysql');
var credentials = require('./credentials'); //CREATE THIS FILE YOURSELF
var connection  = mysql.createConnection(credentials);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // use either jade or ejs       // instruct express to server up static assets
app.use(express.static('public'));

//router middleware
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);

    connection.connect();

    // continue doing what we were doing and go to the route
    next(); 
});

//api routes
router.get('/', function(req, res) {
    res.json({
        name: 'Panorama API', 
        version: '1.0'
    });
});

//apply routes to app
//all of our routes will be prefixed with /api
app.use('/api', router);

//non api route for our views
app.get('/', function(req, res) {
    res.render('index');
});



connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});

connection.end();



// Set server port
var port        = process.env.PORT || 3000;
app.listen(port);
console.log('server is running');