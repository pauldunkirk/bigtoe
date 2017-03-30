// require express, path, body-parser - above the token
require('dotenv').config();

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var findEmptySendEmail = require('./server/modules/automatic-emails');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './public')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '.public/index.html'));
});


//server listening on localhost 5000 if available
var portDecision = process.env.PORT || 5000;
app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
  // findEmptySendEmail();
});

var requestsroutes = require('./server/routes/requestsroutes.js');
app.use('/requestsroutes', requestsroutes);


// above not secure happens before token - next 2 lines require token
var decoder = require('./server/modules/decoder');
app.use(decoder.token);

// below app.use are secure, only if decoder token
var gigsroutes = require('./server/routes/gigsroutes.js');
app.use('/gigsroutes',gigsroutes);
var mp3sroutes = require('./server/routes/mp3sroutes.js');
app.use('/mp3sroutes', mp3sroutes);
var chartsroutes = require('./server/routes/chartsroutes.js');
app.use('/chartsroutes', chartsroutes);
var contactsroutes = require('./server/routes/contactsroutes.js');
app.use('/contactsroutes', contactsroutes);
