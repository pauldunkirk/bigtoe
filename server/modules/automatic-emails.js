var router = require('express').Router(); //add .Router method to 'require method' which takes in express as parameter, assign all to var router
var pg = require('pg');  // adds postgres, (shorthand 'pg') to 'require method' assign to var pg
var cron = require('cron'); // adds node-cron to require method assign to var cron
var nodemailer = require('nodemailer'); // add nodemailer to require object assign as var nodemailer
var connectionString = require('./database-config');

// below are notes I wrote out before writing code:
// send an email once per week to user who has an "null" cell in gigs table
// once per week, node-cron calls findEmptySendEmail() function: gets gigs table, compares columns to empty,
// if guitar, trumpet, trombone, sax, keys, bass, female_vocals, drums, male_vocals === empty then sendEmail()
// must check against email database: users


var job = new cron.CronJob('* * * * *', function() {
  // findEmptySendEmail();
  //commented out function call until actually running
   console.log('Function executed!');
}, null, true);
//actually want this: '5 16 * * sun'  // look this up cuz I forgot what it means, except the sun part :)

function findEmptySendEmail() {
  // router.get('/', function(req, res) {
  //   console.log('hit my get users for nodemailer route');
  pool.connect(function(err, client, done) {  //if err 500, client is object for .query, done to step out of pool
    if (err) {
      console.log(err); // should add message like unable to connect
      res.sendStatus(500); // should add message like unable to connect
    } else {
      client.query('SELECT * FROM gigs ORDER by id ASC', function(err, result) { // result used in "inner for-loop" below
        done(); //built-in method of pg? puts connection back in pool cuz only 10, see config
        if (err) {
          console.log(err); // should add message like query didn't take
        } else {

          var bandMembers = [
            {instrument: 'guitar' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'trumpet' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'trombone' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'sax' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'keys' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'bass' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'female_vocals' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'drums' , emailofpersontobother: 'pauldunkirk@gmail.com'},
            {instrument: 'male_vocals' , emailofpersontobother: 'pauldunkirk@gmail.com'}
          ];
          // hardcode array of objects that each have {instrument: 'database_column_title', emailofpersontobother: 'guitarist@gmail.com'}
          // for-loop through this array
          // console.log(result.rows);

          for (var i = 0; i < bandMembers.length; i++) {
            var gigId;
            var sendEmail = false;
            var currentInstrument= bandMembers[i].instrument; //each instrument property's value in bandMembers array is currentInstrument as outer for-loop iterates through
            var currentEmailOfPersonToBother= bandMembers[i].emailofpersontobother; // each person's email (emailofpersontobother) of array called currentEmailOfPersonToBother
            for (var a = 0; a < result.rows.length; a++) {
              if (result.rows[a][currentInstrument] === null) {
                gigId = result.rows[a].id; //if null, then add id from database to gigId and sendEmail
                console.log('Gig ID NULL: ', gigId);
                console.log('Instrument:', currentInstrument);
                // looking for null, if found one, sendEmail is true
                sendEmail = true;
              } // end if (if but no else?)
            } //inner for-loop ends here

            if (sendEmail) { // sendEmail is true...

              var transporter = nodemailer.createTransport({ //...createTransport method on nodemailer object and ...
                service: 'Gmail',
                auth: {
                  user: 'bigtoenthejam@gmail.com',
                  pass: 'emailforbigtoe'
                }
              }); // end transporter - (still in "if(sendEmail)"

              var mailOptions = { // ... and add mailOptions object as parameter to sendMail method which is added to transporter
                from: 'bigtoenthejam@gmail.com', // sender address
                to: currentEmailOfPersonToBother, // email for person at that position emailofpersontobother
                subject: 'Please update gigs calendar', // Subject line
                text: 'Can you please update gigs calendar for ' +currentInstrument +' ?' // text for instrument
              };
              transporter.sendMail(mailOptions, function(error, info) { // sendMail is built-in method of nodemailer
                if (error) {
                  console.log('Error sending: ', error);
                  res.sendStatus(500);
                } else {
                  console.log('Message sent: ', info.response);
                  res.sendStatus(200);
                }
              }); // end transporter.sendMail on/near 88
            } // end if (sendEmail) on/near 72
          } // end outer for-loop on/near 57
        } // end else - on/near 38
      }); // end client.query function on/near 34
    } // end else which contains client.query on/near 33
  }); // end pool.connect on/near 29
} // end findEmptySendEmail on/near 26
module.exports = findEmptySendEmail;
