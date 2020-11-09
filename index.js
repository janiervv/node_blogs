const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')

const blogRouter = require('./controllers/blogs')
app.use(bodyParser.json())  
app.use('/api/blogs', blogRouter)

app.use(cors())
app.use(express.json())


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

module.exports = app
