//module.exports = (() => {

    // set variables for app
    var express     = require('express');
    var app         = express();
    var path        = require('path');
    var bodyParser  = require('body-parser');

    var mysql       = require('mysql');
    var credentials;
    try{
        credentials = require('./credentials'); //CREATE THIS FILE YOURSELF
    }catch(e){
        //heroku support
        credentials = require('./credentials_env');
    }

    // Setup MySQL Connection
    var connection  = mysql.createConnection(credentials);
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
    var apiRouter = require('./routers/api')(express, connection);

    // Apply Routes to App
    // All of these routes will be prefixed with /api
    app.use('/api', apiRouter);

    // non api route for our views
    app.get('/', (req, res) => {
        res.render('index');
    });

    // Better way to disable x-powered-by
    app.disable('x-powered-by');

   /* return app;
})();*/

module.exports = app;


//OLD WAY BEFORE WE SWITCHED THIS TO MAKE APP A MODULE
/*
// Set server port
var port        = process.env.PORT || 3000;
var host        = process.env.HOST || '0.0.0.0'; // For Heroku
app.listen(port, host);
console.log('server is running');*/