const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')



blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })


  

  blogRouter.delete('/:id', async (request, response) => {

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    })




  
  blogRouter.post('/', async (request, response) => {

    var body = request.body

    console.log(body)

    const user = await User.findById(body.user_id) //Blogiin tuli jo kirjoittajan ID, mutta kirjoittajalle ei blogin ID-tä


    if (body.title !== undefined && body.url !== undefined){

    if (body.likes == null) {
      var body_string = JSON.stringify(body)
      body = body_string.substring(0, body_string.length - 1)
      body = body + ',"likes": 0 }'
      body = JSON.parse(body)
    }

    const blog = new Blog(body)
  
    const savedBlog = blog
      .save()
      .then(result => {
        response.status(201).json(result)
      
      user.blogs = user.blogs.concat(savedBlog.id)

      user.save()
    })
    } else {
      response.status(400).json(result)
    }
  })





  blogRouter.put('/:id', async (request, response) => {

      const body = request.body
      const oldBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes:body.likes,
      }

      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, oldBlog)
      response.json(updatedBlog.toJSON())
  })
  


  module.exports = blogRouter