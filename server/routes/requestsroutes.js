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

router.get('/', function(req, res) {
    console.log('hit my get requests route');
    pg.connect(connectionString, function(err, client, done){
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM requests ORDER BY id DESC', function(err, result) {
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
});


router.post('/addrequest', function(req, res) {
  console.log('hit post route');
  console.log('here is the body ->', req.body);
  var someNewSong = req.body;
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      client.query('INSERT INTO requests (song, artist, requester) VALUES ($1, $2, $3);',
        [someNewSong.song, someNewSong.artist, someNewSong.requester], function(err, result) {
          done();
          if(err){
            console.log(err);
            res.sendStatus(500);
          }else{
            res.sendStatus(201);
          }
      });
    }
  });
});

router.delete('/:id', function(req, res) {
  var songToDeleteId = req.params.id;
  console.log('hit delete route');
  console.log('here is the id to delete ->', songToDeleteId);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      client.query('DELETE FROM requests WHERE id=$1;',
        [songToDeleteId], function(err, result) {
          done();
          if(err){
            console.log(err);
            res.sendStatus(500);
          }else{
            res.sendStatus(200);
          }
      });
    }
  });
});


module.exports = router;
