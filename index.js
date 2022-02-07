require('dotenv').config()
const { response } = require('express')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
morgan.token('reqbody', function (req) {
    return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqbody'))
app.use(cors())



app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
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
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.persons.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

