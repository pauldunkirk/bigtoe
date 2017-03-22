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
      client.query('SELECT * FROM gigs ORDER BY date', function(err, result) {
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
  var newGigInfo = req.body;
  console.log('hit my put - edit- gigs route');
  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      client.query('UPDATE gigs SET gig = $1, address = $2, website = $3, trumpet = $4 WHERE id=$5;',
        [newGigInfo.gig, newGigInfo.address, newGigInfo.website, newGigInfo.trumpet, newGigInfo.id], function(err, result) {
          done();
          if(err){
            console.log(err);
            res.sendStatus(500); // the world exploded
          }else{
            res.sendStatus(200);
          }
      });
      console.log('hit put query');
    }
  });
});

module.exports = router;
