var router = require('express').Router();
var pg = require('pg');

var connectionString = require('../modules/database-config');

// var config = {
//     database: 'bigtoe',
//     host: 'localhost',
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 30000
// };
//
// var pool = new pg.Pool(config);

router.get('/get/gigs', function(req, res) {
    console.log('hit my get gigs route');
    pg.connect(connectionString, function(err, client, done){
        var userEmail = req.decodedToken.email;
        client.query('SELECT * FROM users WHERE email=$1', [userEmail], function(err, authorizationResult) {
            done();
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                pg.connect(connectionString, function(err, client, done){
                    if (authorizationResult.rows.length === 0) {
                        // If the user is not in the database, return a forbidden error status
                        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
                        res.sendStatus(403);
                    } else {
                        client.query('SELECT * FROM gigs ORDER BY date', function(err, result) {
                            done();
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                            } else {
                                console.log(result.rows);
                                res.status(200).send(result.rows);
                            }
                        });
                    }
                });
            }
        });
    });
});
//
router.put('/update/gigs', function(req, res) {
    var newGigInfo = req.body;
    console.log('hit my put - edit- gigs route');
    pg.connect(connectionString, function(err, client, done){
        var userEmail = req.decodedToken.email;
        client.query('SELECT * FROM users WHERE email=$1', [userEmail], function(err, authorizationResult) {
            done();
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                pg.connect(connectionString, function(err, client, done){
                    if (authorizationResult.rows.length === 0) {
                        // If the user is not in the database, return a forbidden error status
                        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
                        res.sendStatus(403);
                    } else {


                        client.query('UPDATE gigs SET gig = $1, address = $2, website = $3, trumpet = $4 WHERE id=$5;', [newGigInfo.gig, newGigInfo.address, newGigInfo.website, newGigInfo.trumpet, newGigInfo.id], function(err, result) {
                            done();
                            if (err) {
                                console.log(err);
                                res.sendStatus(500); // the world exploded
                            } else {
                                res.sendStatus(200);
                            }
                        });

                    }
                });
            }
        });
    });
});


module.exports = router;
