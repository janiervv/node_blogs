require('dotenv').config()

let PORT = 3003
let MONGODB_URI = 'process.env.mongodb+srv://fullstack_user:FullStackSalasana123@cluster0.z5ztf.mongodb.net/blog?retryWrites=true'

module.exports = {
  MONGODB_URI,
  PORT
}