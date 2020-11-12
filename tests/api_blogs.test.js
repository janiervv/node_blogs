

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const Blog = require('../models/blog')
const api = supertest(app)


const initialBlogs = [
    {
        title: 'Title 1',
        author: 'Author 1',
        url: 'URL1',
        likes: 3
    },
    {
        title: 'Title 2',
        author: 'Author 2',
        url: 'URL2',
        likes: 4
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

  })

test('blog length is 2', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

test('blog ID like id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined();
})

test('blog can be added', async () => {

    const newBlogEntry = { 
        title: 'Title 3',
        author: 'Author 3',
        url: 'URL3',
        likes: 5
      }

      await api
      .post('/api/blogs')
      .send(newBlogEntry)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(initialBlogs.length + 1)
})


test('Likes to 0 if null', async () => {

    const newBlogEntry = { 
        title: 'Title 3',
        author: 'Author 3',
        url: 'URL3'
      }

      await api
      .post('/api/blogs')
      .send(newBlogEntry)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
      const response = await api.get('/api/blogs')
      var likes = response.body[2].likes

      expect(likes).toBe(0)
})


test('URL and Title can not be null', async () => {

    const newBlogEntry1 = { 
        title: 'Title 3',
        author: 'Author 3',
        likes: 5
      }

      const newBlogEntry2 = { 
        author: 'Author 3',
        url: 'URL3',
        likes: 5
      }

      await api
      .post('/api/blogs')
      .send(newBlogEntry1)
      .expect(400)

      await api
      .post('/api/blogs')
      .send(newBlogEntry2)
      .expect(400)

})




afterAll(() => {
  mongoose.connection.close()
})
