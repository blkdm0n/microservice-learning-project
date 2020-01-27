const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const port = process.argv.slice(2)[0]
const app = express()
app.use(bodyParser.json())

const powers = [
  {id: 1, name: 'flying'},
  {id: 2, name: 'teleporting'},
  {id: 3, name: 'super strength'},
  {id: 4, name: 'clairvoyance'},
  {id: 5, name: 'mind reading'}
]

const heroes = [
  {
    id: 1,
    type: 'Spider Man',
    displayName: 'Peter Parker',
    powers: [1,4],
    img: 'spider-man',
    busy: false
  },
  {
    id: 2,
    type: 'Batman',
    displayName: 'Bruce Wayne',
    powers: [2, 5],
    img: 'bat-man', 
    busy: false
  },
  {
    id: 3,
    type: 'Captain America',
    displayName: 'Steve Rogers',
    powers: [3,4],
    img: 'captain-america',
    busy: false
  },
  {
    id: 4,
    type: 'Incredible Hulk',
    displayName: 'David Banner',
    powers: [3, 5],
    img: 'hulk-smash',
    busy: false
  },
  {
    id: 5,
    type: 'Wonder Woman',
    displayName: 'Princess Diana',
    powers: [3, 5],
    img: 'wonder-woman',
    busy: false
  }
]


// GET route returning list of heroes
app.get('/heroes', (req, res) => {
  console.log('Returning a list of heroes')
  res.send(heroes)
})

// GET route returning list of powers
app.get('/powers', (req, res) => {
  console.log('Returning a list of powers')
  res.send(powers)
})

// POST route
app.post('/hero/**', (req, res) => {
  // TODO:  test this what is this line of code doing?
    // This code simply saves the hero's ID to a variable we can use later
  const heroID = parseInt(req.params[0])

  // TODO: find() returns the value of the FIRST element that satisfies the testing condition
  const foundHero = heroes.find(subject => subject.id === heroID)
  
  // TODO: How do I add the attribute? Sent in the POST from Threat's service
  if (foundHero) {
    for (let attribute in foundHero) {
      if (req.body[attribute]) {
        foundHero[attribute] = req.body[attribute]
        console.log(`Set ${attribute} to ${req.body[attribute]} in hero: ${heroID}`)
      }
    }
  } else {
    console.log(`Hero not found.`)
    res.status(404).send()
  }
})

// Serves our static image files
app.use('/img', express.static(path.join(__dirname, 'img')))

console.log(`Heroes service listening on port ${port}`)
app.listen(port)
