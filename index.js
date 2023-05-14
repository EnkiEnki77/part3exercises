const express = require('express')
const app = express()

app.use(express.json())

let db = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    console.log('Hello World')
    res.send('Hello World')
})

app.get('/api/persons', (req, res) => {
    res.json(db)
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

app.post('/api/persons', (req, res) => {
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

    const person = {
        id: generateId(),
        name: req.body.name,
        number: req.body.number
    }

    db = db.concat(person)

    res.json(person)
})

function generateId(){
    const id = Math.floor(Math.random() * 1000000000)

    return id
}

const PORT = 3001
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))