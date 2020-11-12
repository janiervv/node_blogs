const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const User = require('../models/user')
const api = supertest(app)


const initialUsers = [
    {
        name: 'First User',
        username: 'firstuser',
        password: "secret1"
    },
    {
        name: 'Second User',
        username: 'seconduser',
        password: "secret2"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
    userObject = new User(initialUsers[1])
    await userObject.save()

  })

test('username and password must be at least 3 characters', async () => {

        const newUserEntry1 = { 
            name: 'Third User',
            username: 'ts',
            password: "secret3"
          }
    
          const newUserEntry2 = { 
            name: 'Fourth User',
            username: 'fourthuser',
            password: "ts"
          }
    
          await api
          .post('/api/users')
          .send(newUserEntry1)
          .expect(400)

          const validationcheck = await api.post('/api/users').send(newUserEntry1)
          var body = JSON.stringify(validationcheck.body)
          console.log(body)
          expect(body).toContain(`error":"Error! Username or password validation failed. Check both are 3 characters or more.`)
    
          await api
          .post('/api/users')
          .send(newUserEntry2)
          .expect(400)

          const validationcheck2 = await api.post('/api/users').send(newUserEntry2)
          var body = JSON.stringify(validationcheck2.body)
          console.log(body)
          expect(body).toContain('error":"Error! Username or password validation failed. Check both are 3 characters or more.')
    
})


afterAll(() => {
  mongoose.connection.close()
})