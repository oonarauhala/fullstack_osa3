const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to', url)
mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

const validator = (number) => {
    console.log('number', number)
    const regex = /^[0-9]{2,3}-[0-9]{6,10}$/
    const value = regex.test(number)
    return value
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: String,
})

personSchema.path('number').validate(validator, 'Incorrect number, try format XXX-XXXXXX or XX-XXXXXX')

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)