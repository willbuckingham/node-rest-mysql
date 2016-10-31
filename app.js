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

connection.connect();

//router middleware
//we can use this later to validate some stuff
router.use(function(req, res, next) {
    // log each request to the console
    console.log("You have hit the /api", req.method, req.url);

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

router.get('/test', function(req, res) {
    var test;
    
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;

        test = rows[0].solution;
        console.log(test);

        res.json({
            'test': test
        });
    }); 
});

//we can use .route to then hook on multiple verbs
router.route('/panoramas')
    .get(function(req, res) {
        connection.query('SELECT * FROM panos', function(err, rows, fields) {
            if (err) console.error(err);

            res.json(rows);
        });
    })

    .post(function(req, res) {

    });
//end route

router.route('/panoramas/:id')
    .get(function(req, res) {
        console.log(req.id);
        var query = connection.query('SELECT * FROM panos WHERE id=?', [req.id], function(err, rows, fields) {
            if (err) console.error(err);
            console.log(rows);
            res.json(rows);
        });
        console.log(query);
    });

//apply routes to app
//all of our routes will be prefixed with /api
app.use('/api', router);

//non api route for our views
app.get('/', function(req, res) {
    res.render('index');
});









// Set server port
var port        = process.env.PORT || 3000;
app.listen(port);
console.log('server is running');