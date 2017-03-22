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

  router.get('/get/mp3s', function(req, res) {
  console.log('hit my get mp3s route');
  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      client.query('SELECT * FROM mp3s ORDER BY id', function(err, result) {
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

// router.put('/update/mp3s', function(req, res) {
//   var newmp3sInfo = req.body;
//   console.log('hit my put - edit- mp3s route');
//   pool.connect(function(err, client, done) {
//     if(err){
//       console.log(err);
//       res.sendStatus(500);
//     }else{
//       client.query('UPDATE mp3s SET name = $1, url = $2 WHERE id=$3;',
//         [newmp3sInfo.name, newmp3sInfo.url, newmp3sInfo.id], function(err, result) {
//           done();
//           if(err){
//             console.log(err);
//             res.sendStatus(500); // the world exploded
//           }else{
//             res.sendStatus(200);
//           }
//       });
//       console.log('hit put query');
//     }
//   });
// });

module.exports = router;
