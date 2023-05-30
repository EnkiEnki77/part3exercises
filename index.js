const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const Phonebook = require('./models/phoneBook')
app.use(express.json())
app.use(morgan('tiny'))
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
    Phonebook.find({})
    .then(numbers => res.json(numbers))
})

app.get('/api/persons/:id', (req, res) => {
    const reqId = req.params.id
    //If youre trying to respond with a specific item from the db based on the value of a param such as id than use array.find
    //Then check if the evaluation is null or not if not then you can respond with the found item. Otherwise throw a 404
    //status and end
    const person = db.find(p => p.id == reqId)
    
    if(person != null){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const personbookLength = db.length
    const requestDate = new Date()
    
    res.send(`<h1>Personbook has info for ${personbookLength} people</h1>
               <h1>${requestDate.toDateString()}</h1>`)
})

app.delete('/api/persons/:id', (req, res) => {
    //Be careful when querying for id in the db, the req params are strings. Always make sure you know what the types
    //of your data are. If unsure, do console log typeof
    const id = Number(req.params.id)

    console.log(db.map(p => p.id).includes(id))

    if(db.map(p => p.id).includes(id)){
        const filteredDb = db.filter(p => p.id != id)
        db = filteredDb

        res.status(204).end()
        console.log('deleted')
    }else{
        res.status(404).end()
        console.log('not found')
    }
    
})

app.post('/api/persons', async (req, res) => {

    if(req.body.name == undefined && req.body.number == undefined){
        return res.status(400).json({
            error: 'name and number missing'
        })
    }else if(req.body.name == undefined){
        return res.status(400).json({
            error: 'name missing'
        })
    }else if(req.body.number == undefined){
        return res.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Phonebook({
        name: req.body.name,
        number: req.body.number
    })

    person.save()
    .then(savedPerson => {
        res.json(savedPerson)
        console.log(savedPerson.name + 's number saved to the db')
    })
})

app.use(unknownEndpoint)

function generateId(){
    const id = Math.floor(Math.random() * 1000000000)

    return id
}

function unknownEndpoint(req, res){
  res.status(404).json({
    error: 'Unknown endpoint'
  })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))