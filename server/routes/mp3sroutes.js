var router = require('express').Router();
var pg = require('pg');
var connectionString = require('../modules/database-config');

router.get('/get/mp3s', function(req, res) {
    console.log('hit my get mp3s route');
    pg.connect(connectionString, function(err, client, done){
        var userEmail = req.decodedToken.email;
        client.query('SELECT * FROM users WHERE email=$1', [userEmail], function(err, authorizationResult) {
            done();
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                pg.connect(connectionString, function(err, client, done){
                    if (authorizationResult.rowCount === 0) {
                        // If the user is not in the database, return a forbidden error status
                        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
                        res.sendStatus(403);
                    } else {
                        client.query('SELECT * FROM mp3s ORDER BY id', function(err, result) {
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


module.exports = router;
