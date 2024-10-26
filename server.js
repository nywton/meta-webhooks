const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Simple WhatsApp Webhook tester</br>See server.js for implementation!');
});

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === 'token') {
    res.send(challenge);
  } else {
    res.status(400).send('Invalid subscription request');
  }
});

app.post('/webhook', (req, res) => {
  console.log('Incoming webhook:', req.body);
  res.sendStatus(200);
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
