const { response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
morgan.token('reqbody', function (req) {
    return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqbody'))
app.use(cors())

let persons = {
    "persons": [
        {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
        },
        {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
        },
        {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
        },
        {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
        }
    ]
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons.persons)
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`
    <p>Phonebook has ${persons.persons.length} people</p>
    <br>
    <p>${date}</p>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.persons.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const id = Math.floor(Math.random() * 1000)
    const person = req.body
    if (person.name && person.number) {
        persons.persons.forEach(listPerson => {
            if (listPerson.name === person.name) {
                return res.status(400).json({
                    error: 'name must be unique'
                })
            }
        })
        person.id = id
        persons.persons = persons.persons.concat(person)
        res.json(person)
    } else {
        return res.status(400).json({
            error: 'content missing'
        })
    }

})


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
