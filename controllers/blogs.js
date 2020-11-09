const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')



blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogRouter.post('/', (request, response) => {

    var body = request.body

    if (body.title !== undefined && body.url !== undefined){

    if (body.likes == null) {
      var body_string = JSON.stringify(body)
      body = body_string.substring(0, body_string.length - 1)
      body = body + ',"likes": 0 }'
      body = JSON.parse(body)
    }

  

    const blog = new Blog(body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })

    } else {
      response.status(400).json(result)
    }
  })

  


  module.exports = blogRouter