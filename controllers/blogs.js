const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', (request, response) => {
    Blog
      .find({}).populate('user', { username: 1, name: 1 })
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

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    body.user= user._id


    if (body.title !== undefined && body.url !== undefined){

    if (body.likes == null) {
      var body_string = JSON.stringify(body)
      body = body_string.substring(0, body_string.length - 1)
      body = body + ',"likes": 0 }'
      body = JSON.parse(body)
    }

    const blog = new Blog(body)
  

    const savedBlog = await blog.save()
      response.status(201)

      user.blogs = user.blogs.concat(savedBlog.id)
      await user.save()
      response.json(savedBlog.toJSON())

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