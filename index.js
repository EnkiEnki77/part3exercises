const express = require('express')
const app = express()

app.use(express.json())

const db = [
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

const PORT = 3001
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))