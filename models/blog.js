const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_id'
    }
  })


  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})



module.exports = mongoose.model('Blog', blogSchema)
