const app = require('./app')
const http = require('http')
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')
const config = require('./utils/config')
// const blogsRouter = require('./controllers/blogs')
// const blogSchema = new mongoose.Schema({
//     title: String,
//     author: String,
//     url: String,
//     likes: Number
// })

// blogSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//     }
// })

// const Blog = mongoose.model('Blog', blogSchema)

// const mongoUrl = config.MONGODB_URI
// mongoose.connect(mongoUrl)

// app.use(cors())
// app.use(express.json())
const logger = require('./utils/logger')
// const blogsRouter = require('./controllers/blogs')

// app.get('/api/blogs', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })
// app.use('/api/blogs',blogsRouter)

// const PORT = 3003
const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
