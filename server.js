const express = require('express');
const      app = express();
const      cookieParser = require('cookie-parser');

const ApiKey = "ba5Rfw.KmcD5g:PO4mU-9T3PdKq-AO";
const Ably = require("ably");
/* Instance the Ably REST server library */
var rest = new Ably.Rest({
  key: ApiKey
});
console.log('in auth server');

var uniqueId = function() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
  };

/* Start the Express.js web server */


app.use(cookieParser());

/* Server static content from the root path to keep things simple */
app.use('/', express.static(__dirname));

/* Issue token requests to clients sending a request
   to the /auth endpoint */
app.get('/auth', function (req, res) {
  var tokenParams = {
      'clientId': uniqueId()
    };


  console.log("Authenticating client:", JSON.stringify(tokenParams));
  rest.auth.createTokenRequest(tokenParams, function(err, tokenRequest) {
    if (err) {
      res.status(500).send('Error requesting token: ' + JSON.stringify(err));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(tokenRequest));
    }
  });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
