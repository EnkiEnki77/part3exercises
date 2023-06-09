const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('Add the password to the terminal command')
  process.exit(1)
}

const password = process.argv[2]
const dbName = 'phonebook'

const url = `mongodb+srv://layman212:${password}@phonebook.pvv7mgq.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phoneNumberSchema = new mongoose.Schema({
  name: String,
  number: String
})

const PhoneNumber = mongoose.model('Person', phoneNumberSchema)

if(process.argv.length < 4){
  PhoneNumber.find({}).then( result => {
    console.log(result)
    mongoose.connection.close()
  })
}else{
  const phoneNumber = new PhoneNumber({
    name: process.argv[3],
    number: process.argv[4]
  })


  phoneNumber
    .save()
    .then(() => {
      console.log(`added ${process.argv[3]} and her number ${process.argv[4]} to the phonebook`)
      mongoose.connection.close()
    })
}

