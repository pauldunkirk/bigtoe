var router = require('express').Router();
var pg = require('pg');
var cron = require('cron');
var nodemailer = require('nodemailer');
var config = {
  database: 'bigtoe',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);

// send an email once per week to user who has an "empty" cell in gigs table
// once per week, node-cron calls findEmpty() function: gets gigs table, compares columns to empty,
// if guitar, trumpet, trombone, sax, keys, bass, female_vocals, drums, male_vocals === empty then sendEmail()
// must check against email database: users


var job = new cron.CronJob('5 16 * * sun', function() {
   sendEmailOnStartup();
   console.log('Function executed!');
}, null, true);
//actually want this: '5 16 * * sun'


// sendEmailOnStatup();
function sendEmailOnStartup() {
  // router.get('/', function(req, res) {
  //   console.log('hit my get users for nodemailer route');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM gigs', function(err, result) {
        done();
        if (err) {
          console.log(err);
        } else {

          var bandMembers = [
            {instrument: 'guitar' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'trumpet' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'trombone' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'sax' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'keys' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'bass' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'female_vocals' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'drums' , emaemailofpersontobotheril: 'pauldunkirk@gmail.com'},
            {instrument: 'male_vocals' , emailofpersontobother: 'pauldunkirk@gmail.com'}
          ];
          // hardcode array of objects that each have {instrument: 'database_column_title', emailofpersontobother: 'guitarist@gmail.com'}
          // for loop through this array
          console.log(result.rows);

          for (var i = 0; i < bandMembers.length; i++) {

            var sendEmail = false;
            var currentInstrument= bandMembers[i].instrument;
            var currentEmailOfPersonToBother= bandMembers[i].emailofpersontobother;
            for (var a = 0; a < result.rows.length; a++) {
              if (result.rows[i][currentInstrument] === null) { // guitar needs to be replaced with bracket notation [instrument]
                sendEmail = true;
              }
            }

            if (sendEmail) {

              var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'bigtoenthejam@gmail.com',
                  pass: 'emailforbigtoe'
                }
              });

              var mailOptions = {
                from: 'bigtoenthejam@gmail.com', // sender address
                to: currentEmailOfPersonToBother, // email for person at that position emailofpersontobother
                subject: 'Please update gigs calendar', // Subject line
                text: 'Can you please update gigs calendar for ' +currentInstrument +' ?' // text for instrument
              };
              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                  res.sendStatus(500);
                } else {
                  console.log('Message sent: ', info.response);
                  res.sendStatus(200);
                }
              });
            }
          } // for loop ends here
        }
      });
    }
  });
}
module.exports = sendEmailOnStartup;
