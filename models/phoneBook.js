const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URI
const see = 'eyes'

mongoose.connect(url)
.then(res => console.log('connected to mongo'))
.catch(err => console.log('error connecting to mongo', err))

const phoneBookSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        required: true
    },
    number: {
        type: String,
        minLength: [8, 'Number must be at least 8 characters'],
        required: [true, 'A number is required'],
        validate: {
            validator: function(v){
                if(v.includes('-')){
                    const numberParts = v.split('-')
                    
                    if(numberParts.length == 2){
                        if(!Number.isNaN(Number(numberParts[0])) && !Number.isNaN(Number(numberParts[0]))){
                            return numberParts[0].length > 2
                        }else{
                            return false
                        }
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            },
            message:props => `${props.value} is not a valid number`
        }
    }
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phone number', phoneBookSchema)