const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }


  const password = process.argv[2]

  //Connection string to db given in the site, password is passed into the password variable through the terminal. The 
  //noteApp db is defined as the one to connect to. 
  const url =
  `mongodb+srv://layman212:${password}@phonebook.pvv7mgq.mongodb.net/noteApp?retryWrites=true&w=majority`

  mongoose.set('strictQuery', false)
  //connects to db using above url
  mongoose.connect(url)

  //Now we define the schema of the documents(resources) in the db, the schema is basically the shape of the data, and
  //defines the strict types for the properties of the document
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
  })

  //Models are constructor functions which can create new JS objects, and enforces the shape/types of that object based
  //on the schema passed to the model at creation. The name you pass to the model, also defines the name for the collection
  const Note = mongoose.model('Note', noteSchema)

  //New note object with schema shape enforced by the model. 
//   const note = new Note({
//     content: "I dont fully understand yet.",
//     important: true
//   })

  //Since the object above was created with the Note model it contains all of the properties/methods of a model. This 
  //allows us to save the new object to the db. 
  //the method save saves a model constructed object to the db, save returns a promise that can then be handled by then.
//   note
//   .save()
  //when the object is saved to the db .then calls the callback, mongoose.connection.close is called to end the connection
  //to the db, if this doesnt happen the program will never finish execution.
//   .then(result => {
//     console.log('note saved')
//     mongoose.connection.close()
//   })

//In order to grab resouces from the db, use the Model.find(). The argument passed is the search param, in this case {}
//tells the db we want all resources. We then recieve a promise that can be handled with .then the argument passed to 
//the callback is the result which is an array containing all of the resources given back based on the search condition.
//After we define what to do with the result data we should end the connection to the db.
Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })