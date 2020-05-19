// set constiables for app
const express     = require('express');
const app         = express();
const path        = require('path');
const bodyParser  = require('body-parser');

const mysql       = require('mysql');
let credentials;
try{
    credentials = require('./credentials'); //CREATE THIS FILE YOURSELF
}catch(e){
    //fall back env consts - heroku support
    credentials = require('./credentials_env');
}

// Setup MySQL Connection
const connection  = mysql.createConnection(credentials);
// Connect to MySQL DB
connection.connect();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // use either jade or ejs       
// instruct express to server up static assets
app.use(express.static('public'));

// Support for Crossdomain JSONP
app.set('jsonp callback name', 'callback');

// Get the Routes for our API
const apiRouter = require('./routers/api')(express, connection);

// Apply Routes to App
// All of these routes will be prefixed with /api
app.use('/api', apiRouter);

// non api route for our views
app.get('/', (req, res) => {
    res.render('index');
});

// Better way to disable x-powered-by
app.disable('x-powered-by');


module.exports = app;
