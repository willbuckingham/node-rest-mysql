//Dependencies - Express 4.x and the MySQL Connection
module.exports = function(express, connection){
	var router      = express.Router();

	// Router Middleware
	router.use(function(req, res, next) {
	    // log each request to the console
	    console.log("You have hit the /api", req.method, req.url);

	    // Remove powered by header
	    //res.set('X-Powered-By', ''); // OLD WAY
	    //res.removeHeader("X-Powered-By"); // OLD WAY 2
	    // See bottom of script for better way

	    // CORS 
	    res.header("Access-Control-Allow-Origin", "*"); //TODO: potentially switch to white list version
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	    // we can use this later to validate some stuff

	    // continue doing what we were doing and go to the route
	    next();
	});

	// API ROOT - Display Available Routes

	//TODO: THIS NO LONGER WORKS BECAUSE WE MOVE THE ROUTES INTO A SEPARATE FILE, UNLESS I PASS IN APP AS WELL

	/*router.get('/', function(req, res) {
	    //Generate a List of Routes on the APP
	    //http://stackoverflow.com/a/28199817
	    var route, routes = [];
	    app._router.stack.forEach(function(middleware){
	        if(middleware.route){ // routes registered directly on the app
	            routes.push(middleware.route);
	        } else if(middleware.name === 'router'){ // router middleware 
	            middleware.handle.stack.forEach(function(handler){
	                route = handler.route;
	                route && routes.push(route);
	            });
	        }
	    });
	    console.log(routes)

	    res.jsonp({
	        name: 'Panorama API', 
	        version: '1.0',
	        routes: routes // TODO: format this better
	    });

	});*/

	// Simple MySQL Test
	router.get('/test', function(req, res) {
	    var test;
	    
	    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
	        if (err) throw err;

	        test = rows[0].solution;

	        res.jsonp({
	            'test': test
	        });
	    }); 
	});

	// http://www.restapitutorial.com/lessons/httpmethods.html
	// POST - Create
	// GET - Read
	// PUT - Update/Replace - AKA you pass all the data to the update
	// PATCH - Update/Modify - AKA you just pass the changes to the update
	// DELETE - Delete

	// COLLECTION ROUTES
	router.route('/panoramas')
	    //we can use .route to then hook on multiple verbs
	    .post(function(req, res) {
	        var data = req.body; // maybe more carefully assemble this data
	        console.log(req.body)
	        var query = connection.query('INSERT INTO panos SET ?', [data], function(err, result){
	            if(err){
	                console.error(err);
	                res.sendStatus(404);
	            }else{
	                res.status(201);
	                res.location('/api/panoramas/' + result.insertId);
	                res.end();
	            }
	        });
	        console.log(query.sql);
	    })

	    .get(function(req, res) {
	        connection.query('SELECT * FROM panos', function(err, rows, fields) {
	            if (err) console.error(err);

	            res.jsonp(rows);
	        });
	    })

	    //We do NOT do these to the collection
	    .put(function(req, res) {
	        //res.status(404).send("Not Found").end();
	        res.sendStatus(404);
	    })
	    .patch(function(req, res) {
	        res.sendStatus(404);
	    })
	    .delete(function(req, res) {
	        // LET's TRUNCATE TABLE..... NOT!!!!!
	        res.sendStatus(404);
	    });
	//end route

	// SPECIFIC ITEM ROUTES
	router.route('/panoramas/:id')
	    .post(function(req, res){
	        //specific item should not be posted to (either 404 not found or 409 conflict?)
	        res.sendStatus(404);
	    })

	    .get(function(req, res) {
	        var query = connection.query('SELECT * FROM panos WHERE id=?', [req.params.id], function(err, rows, fields) {
	            if (err) {
	                //INVALID
	                console.error(err);
	                res.sendStatus(404);
	            }else{
	                if(rows.length){
	                    res.jsonp(rows);
	                }else{
	                    //ID NOT FOUND
	                    res.sendStatus(404);
	                }
	            }
	        });
	        console.log(query.sql);
	    })

	    .put(function(req, res){
	        var data = {
	            //data to put, assemble from params???
	        };
	        var query = connection.query('UPDATE panos SET ? WHERE id=? LIMIT 1', [data, req.params.id], function(err, result){
	            if(err){
	                console.log(err);
	                res.sendStatus(404);
	            }else{
	                res.status(200).jsonp({changedRows:result.changedRows, affectedRows:result.affectedRows}).end();
	            }
	        })
	    })

	    .patch(function(req, res){
	        // Need to decide how much this should differ from .put
	    })

	    .delete(function(req, res){
	        var query = connection.query('DELETE FROM panos WHERE id=? LIMIT 1', [req.params.id], function(err, result){
	            if(err){
	                console.log(err);
	                res.sendStatus(404);
	            }else{
	                res.status(200).jsonp({affectedRows:result.affectedRows}).end();
	            }
	        });
	    });
	//end route

	return router;
};