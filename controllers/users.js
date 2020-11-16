const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')




  userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes : 1 })
    response.json(users.map(u => u.toJSON()))
  })


  userRouter.post('/', async (request, response) => { 

    const body = request.body
  
    if (body.username.length > 2 && body.username !== undefined && body.password.length > 2 && body.password !== undefined){

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
    const user = new User({
        name: body.name,
        username: body.username,
        passwordHasH: passwordHash
    })

    const newUser = await user.save()
  
    response.json(newUser)
  }
  else {

    return response.status(400).json({ error: 'Error! Username or password validation failed. Check both are 3 characters or more.'})
  }
  })
  
  


  module.exports = userRouter