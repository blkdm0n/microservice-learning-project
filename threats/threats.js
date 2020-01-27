const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

// TODO:  Figure out what this code is doing
const port = process.argv.slice(2)[0];
const app = express();

app.use(bodyParser.json());

// TODO:  This is how we interact with the heroes microservice

const heroesService = 'http://localhost:3000';

const threats = [
  {
    id: 1,
    displayName: 'Pisa tower is about to collapse.',
    necessaryPowers: ['flying'],
    img: 'tower.jpg',
    assignedHero: 0
  },
  {
    id: 2,
    displayName: 'Engineer is going to clean up server-room.',
    necessaryPowers: ['teleporting'],
    img: 'mess.jpg',
    assignedHero: 0
  },
  {
    id: 3,
    displayName: 'John will not understand the joke',
    necessaryPowers: ['clairvoyance'],
    img: 'joke.jpg',
    assignedHero: 0
  }
];

app.get('/threats', (req, res) => {
  console.log('Returning threats list');
  res.send(threats);
});

// Assigns a hero to a threat and set them to 'busy'
app.post('/assignment', (req, res) => {
  // Sends POST request to the heroesService and sets the hero to busy
  request.post({
    headers: { 'content-type': 'application/json' },
    url: `${heroesService}/hero/${req.body.heroId}`,
    body: `{
          "busy": true
      }`
  }, (err, heroResponse, body) => {
    if (!err) {
      const threatId = parseInt(req.body.threatId);
      const threat = threats.find(subject => subject.id === threatId);
      threat.assignedHero = req.body.heroId;
      res.status(202).send(threat);
    } else {
      res.status(400).send({ problem: `Hero Service responded with issue ${err}` });
    }
  });
});

app.use('/img', express.static(path.join(__dirname, 'img')));

console.log(`Threats service listening on port ${port}`);
app.listen(port);
