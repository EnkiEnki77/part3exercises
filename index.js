const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Phonebook = require('./models/phoneBook')
const { unknownEndpoint, handleErrors } = require('./modules/middleware')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
morgan.token('data', (req, res) => JSON.stringify(req.body))


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

app.delete('/api/persons/:id', (req, res, next) => {
    //Be careful when querying for id in the db, the req params are strings. Always make sure you know what the types
    //of your data are. If unsure, do console log typeof
    const id = req.params.id

    Phonebook.findByIdAndDelete(id)
    .then(result => res.status(204).end())
    .catch(err => next(err))
})

app.post('/api/persons', async (req, res, next) => {

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
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Phonebook.findByIdAndUpdate(id, person, {new: true})
    .then(result => res.status(200).json(result))
    .catch(err => next(err))
})

app.use(unknownEndpoint)

app.use(handleErrors)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))