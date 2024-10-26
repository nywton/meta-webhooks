const express = require('express')
  , bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get("/", function(request, response) {
  response.send('Simple WhatsApp Webhook tester</br>There is no front-end, see server.js for implementation!');
});

app.get('/webhook', function(req, res) {
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == 'token'
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post("/webhook", function(request, response) {
  console.log(request.body);
  console.log('Incoming webhook: ' + JSON.stringify(request.body));
  response.sendStatus(200);
});

const listener = app.listen('8000', function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
