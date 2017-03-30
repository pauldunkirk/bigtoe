var router = require('express').Router();
var pg = require('pg');
var config = {
  database: 'bigtoe',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);

//   router.get('/get/contacts', function(req, res) {
//   console.log('hit my get contacts route');
//   pool.connect(function(err, client, done) {
//     if(err){
//       console.log(err);
//       res.sendStatus(500);
//     }else{
//       client.query('SELECT * FROM users ORDER BY id', function(err, result) {
//         done();
//         if(err){
//           console.log(err);
//           res.sendStatus(500);
//         }else{
//           console.log(result.rows);
//           res.status(200).send(result.rows);
//         }
//       });
//     }
//   });
// });
//
// module.exports = router;


//////////////////////////////////




router.get('/', function(req, res) {
    console.log('hit my get contacts route');
    pool.connect(function(err, client, done) {
        var userEmail = req.decodedToken.email;
        client.query('SELECT * FROM users WHERE email=$1', [userEmail], function(err, clearanceLevelQueryResult) {
            done();
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                pool.connect(function(err, client, done) {
                    if (clearanceLevelQueryResult.rows.length === 0) {
                        // If the user is not in the database, return a forbidden error status
                        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
                        res.sendStatus(403);
                    } else {
                        client.query('SELECT * FROM users ORDER BY id', function(err, result) {
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
