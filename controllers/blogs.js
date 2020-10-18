const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

const Blog = mongoose.model('Blog', blogSchema)


blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogRouter.post('/', (request, response) => {
      logger.info(request.body)
    const Blog = new Blog(request.body)
  
    Blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogRouter
