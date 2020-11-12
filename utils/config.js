require('dotenv').config()

let PORT = 3003
let MONGODB_URI = 'XXXX'

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = 'YYYY'
}

module.exports = {
  MONGODB_URI,
  PORT
}