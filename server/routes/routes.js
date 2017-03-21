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

  router.get('/get/gigs', function(req, res) {
  console.log('hit my get gigs route');
  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      client.query('SELECT * FROM gigs ORDER BY id', function(err, result) {
        done();
        if(err){
          console.log(err);
          res.sendStatus(500);
        }else{
          console.log(result.rows);
          res.status(200).send(result.rows);
        }
      });
    }
  });
});

router.put('/update/gigs', function(req, res) {
  console.log('hit my put - edit- gigs route');
  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      client.query('UPDATE gigs SET status=TRUE WHERE ID=$1;',
        [cellToUpdateId], function(err, result) {
          done();
          if(err){
            console.log(err);
            res.sendStatus(500); // the world exploded
          }else{
            res.sendStatus(200);
          }
      });
    }
  });
});


// router.get('/users', function(req, res) {
// console.log('hit my get users route');
// pool.connect(function(err, client, done) {
//   if(err){
//     console.log(err);
//     res.sendStatus(500);
//   }else{
//     client.query('SELECT * FROM users', function(err, result) {
//       done();
//       if(err){
//         console.log(err);
//         res.sendStatus(500);
//       }else{
//         console.log(result.rows);
//         res.status(200).send(result.rows);
//       }
//     });
//   }
// });
// });




module.exports = router;
