const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(bodyParser.json())  

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(cors())
app.use(express.json())


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

module.exports = app


