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

app.get('/info', (req, res) => {
    const personbookLength = db.length
    const requestDate = new Date()
    console.log(requestDate.toISOString())
    res.send(`<h1>Personbook has info for ${personbookLength} people</h1>
               <h1>${requestDate.toDateString()}</h1>`)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))