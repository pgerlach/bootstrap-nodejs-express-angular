const path = require('path');
const querystring = require('querystring');

const express = require('express');
const morgan = require('morgan');
const nconf = require('nconf');
const _ = require('underscore');
const expressWs = require('express-ws');

// env > configs/local.json > default values
nconf
  .env(['PORT']) // get those vars from env
  .file({file: './configs/local.json'}) // optional file
  .defaults({
    'PORT': '3000'
  })

var app = express();

// add websocket support
expressWs(app);

// display logs
app.use(morgan('combined'))

// return the configuraton dynamically
app.get('/app/config.js', function(req, res, next) {
  // omit 'type' added by nconf
  return res.jsonp(_.omit(nconf.get(), "type"));

  // this can also be used to redirect to a config hosted elsewhere - a backend for example - see commented code
  // const redirectUrl = `${nconf.get('BACKEND_BASE_URL')}/js/config.js${_.isEmpty(req.query) ? '' : '?' + querystring.stringify(req.query)}`;
  // return res.redirect(redirectUrl);
});

// simple echo websocket
app.ws('/echo', function(ws, req) {

  console.log("WS: new connection");

  // echo the message back
  ws.on('message', function(msg) {
    console.log("WS: received message:", msg);
    ws.send(msg);
  });

  ws.on('close', function() {
    console.log('WS: connection closed');
  })
});

// return the static files located under www
app.use(express.static(__dirname + '/www'));

// launch the server
const serverPort = parseInt(nconf.get('PORT'), 10);
app.listen(serverPort, function() {
  console.log("Listening on port", serverPort);
  console.log(`Using backend ${nconf.get('BACKEND_BASE_URL')}`)
});
