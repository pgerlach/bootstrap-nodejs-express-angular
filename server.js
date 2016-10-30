const path = require('path');
const querystring = require('querystring');

const express = require('express');
const morgan = require('morgan');
const nconf = require('nconf');
const _ = require('underscore');

// env > configs/local.json > default values
nconf
  .env(['PORT']) // get those vars from env
  .file({file: './configs/local.json'}) // optional file
  .defaults({
    'PORT': '3000'
  })

var app = express();

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

// return the static files located under www
app.use(express.static(__dirname + '/www'));

// launch the server
const serverPort = parseInt(nconf.get('PORT'), 10);
app.listen(serverPort, function() {
  console.log("Listening on port", serverPort);
  console.log(`Using backend ${nconf.get('BACKEND_BASE_URL')}`)
});
