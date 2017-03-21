var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var router = require('./server/routes/routes.js');
app.use('/routes',router);
app.use('/inboundURLbase',router);
app.use(express.static(path.join(__dirname, './public')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '.public/index.html'));
});

// app.run(function(editableOptions) {
//     editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
//   });


// var decoder = require('./modules/decoder');
// var privateData = require('./routes/private-data');
var portDecision = process.env.PORT || 5000;
app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});




// app.set('port', process.env.PORT || 5000);
// app.listen(app.get('port'), function() {
//     console.log('Listening on port: ', app.get('port'));
// });
