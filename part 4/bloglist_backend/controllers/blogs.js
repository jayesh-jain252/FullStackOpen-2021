const blogsRouter = require('express').Router()
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/',async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//       return authorization.substring(7)
//     }
//     return null
// }

blogsRouter.post('/',async (request, response, next) => {
    const body = request.body
    // const token = getTokenFrom(request)
    // Using Middleware
    // const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!body.likes) {
        body.likes = 0
    }

    const blog = new Blog({
        title: body.title,
        author: body.author || "Anonymous",
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    try{
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    }
    catch(exception){
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    // const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if ( blog.user._id.toString() === user._id.toString() ) {
        try {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
          } catch (exception) {
            next(exception)
          }
    } else {
        return response.status(401).json({ error: `Not Allowed to other users` })
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
  
    const blog = {
        title: body.title,
        author: body.author || "Anonymous",
        url: body.url,
        likes: body.likes
    }
  
    
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog.toJSON())
    }
    catch(exception){
        next(exception)
    }
    //   .then(updatedBlog => {
    //     response.json(updatedBlog.toJSON())
    //   })
    //   .catch(error => next(error))
})

module.exports = blogsRouter
