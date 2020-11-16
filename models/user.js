const mongoose = require('mongoose')
const config = require('../utils/config')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const userSchema = mongoose.Schema({
    name: String ,
    username: {
      type: String,
      unique: true,
      minlength: 3
    },
    passwordHasH: {
      type: String,
      minlength: 3
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ]
  })


  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)