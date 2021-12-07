/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [newUrl, setNewUrl] = useState('')
  const [ notification, setNotification ] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notifyWith(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      })
  }

  const increaseLikes = id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog,likes:blog.likes+1 }

    blogService
      .update(id,changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id!==id?blog:returnedBlog))
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteBlog = (id) => {
    const toDelete = blogs.find(b => b.id === id)
    const ok = window.confirm(`Delete ${toDelete.title} by ${toDelete.author}`)
    if (ok) {
      blogService.remove(id)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          setBlogs(blogs.filter(b => b.id !== id))
          notifyWith(`Deleted ${toDelete.title}`)
        }).catch(() => {
          setBlogs(blogs.filter(b => b.id !== id))
          notifyWith(`${toDelete.title} had already been removed`, 'error')
        })
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleLogout = (event) => {
    window.localStorage.clear()
    window.location.reload()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.response.data.error)
      notifyWith(`${error.response.data.error} `, 'error')
      setUsername('')
      setPassword('')
    }
  }

  blogs.sort(function(a, b) {
    var keyA = a.likes,
      keyB = b.likes
    // Compare the 2 dates
    if (keyA < keyB) return 1
    if (keyA > keyB) return -1
    return 0
  })

  if(user === null){
    return(
      <div>
        <Notification notification={notification} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }
  return(
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
      <br/>

      <Togglable buttonLabel="Create new blog" reversebuttonLabel="Cancel" ref={blogFormRef}>
        <BlogForm createBlog = {addBlog} />
      </Togglable>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} increaseLikes={() => increaseLikes(blog.id)} deleteBlog={() => deleteBlog(blog.id)}/>
      )}
    </div>
  )
}

export default App