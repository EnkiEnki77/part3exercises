const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URI

mongoose.connect(url)
.then(res => console.log('connected to mongo'))
.catch(err => console.log('error connecting to mongo', err))

const phoneBookSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        required: true
    },
    number: String
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phone number', phoneBookSchema)