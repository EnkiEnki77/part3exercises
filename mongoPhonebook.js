const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Add the password to the terminal command')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://layman212:${password}@phonebook.pvv7mgq.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phoneNumberSchema = new mongoose.Schema({
    name: String,
    number: String
})

const PhoneNumber = mongoose.model('Phone number', phoneNumberSchema)

 if(process.argv.length < 4){
    PhoneNumber.find({}).then( result => {
        console.log(result)
    })
    mongoose.connection.close()
}

const phoneNumber = new PhoneNumber({
    name: process.argv[3],
    number: process.argv[4]
})

phoneNumber
.save()
.then(result => {
    console.log(`added ${process.argv[3]} and her number ${process.argv[4]} to the phonebook`)
    mongoose.connection.close()
})