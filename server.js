var http = require('http');
var app = require('./app');

var port = process.env.PORT || 3000; 	  // set our port
var host = process.env.HOST || '0.0.0.0'; // For Heroku to run successfully

http.createServer(app).listen(port, host, () => {
	console.log("Server ready at http://" + host + ":" + port);
});