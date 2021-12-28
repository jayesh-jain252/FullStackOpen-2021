import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { incrementLikes } from './reducers/blogReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch,useSelector } from 'react-redux'
import { initializeBlogs,deleteBlog,comment } from './reducers/blogReducer'
import { initializeAllUsers } from './reducers/userReducer'
import { useHistory } from 'react-router-dom'
import {
  Switch, Route,Link, useRouteMatch
} from 'react-router-dom'
import { Table,Form, Button, Navbar,Nav } from 'react-bootstrap'

const App = () => {
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blog)

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeAllUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      history.push('/blogs')
    } catch (error) {
      console.log(error.response.data.error)
      console.log(`${error.response.data.error} `, 'error')
      setUsername('')
      setPassword('')
    }
  }


  const handleLike = (blog) => {
    dispatch(incrementLikes(blog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(deleteBlog(id))
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    const commentToAdd = event.target.comment.value
    event.target.comment.value = ''
    dispatch(comment(foundBlog, commentToAdd))
  }

  const userMatch = useRouteMatch('/users/:id')
  const foundUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const foundBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null


  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className="container">
      <Switch>
        <Route path = "/blogs/:id">
          {user === null ? (
            <div>
              <h1>BlogList</h1>
              <Notification />
              <h2>Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Label>username:</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                  />
                  {/* <input
                    id='username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                /> */}

                  <Form.Label>password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  {/* <input
                    id='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  /> */}
                  <Button variant="primary" type="submit">
                  Login
                  </Button>
                </Form.Group>
              </Form>
            </div>):(
            <div>
              <Notification />
              {!foundBlog ? (
                null
              ) : (
                <div>
                  <h1>BlogList</h1>
                  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="mr-auto">
                        <Nav.Link href="#" as="span">
                          <Link to={'/users'}>users</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                          <Link to={'/blogs'}>blogs</Link>
                        </Nav.Link>
                        <Navbar.Text>
                          {user.name} logged in <button onClick={handleLogout}>logout</button>
                        </Navbar.Text>
                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>
                  <br/>
                  <h2>{foundBlog.title}</h2>
                  <p>{foundBlog.url}</p>
                  <p>
                    {foundBlog.likes} likes {' '}
                    <button onClick={() => {handleLike(foundBlog)} }> Like </button>
                  </p>
                  <p>added by {foundBlog.author}</p>
                  <h3>comments</h3>
                  <form onSubmit={handleComment}>
                    <div>
                      <input id="comment" type="text" name="comment" />
                      <button id="comment-button" type="submit">
                        add comment
                      </button>
                    </div>
                  </form>
                  <ul>
                    {foundBlog.comments.map((comment) => <li key={comment} >{comment}</li>)}
                  </ul>
                </div>)}
            </div>
          )}
        </Route>

        <Route path="/users/:id">
          {user === null ? (
            <div>
              <h1>BlogList</h1>
              <Notification />
              <h2>Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Label>username:</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                  />
                  {/* <input
                    id='username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                /> */}

                  <Form.Label>password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  {/* <input
                    id='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  /> */}
                  <Button variant="primary" type="submit">
                  Login
                  </Button>
                </Form.Group>
              </Form>
            </div>):
            (
              <div>
                <h2>Bloglist</h2>
                <Notification />
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Link href="#" as="span">
                        <Link to={'/users'}>users</Link>
                      </Nav.Link>
                      <Nav.Link href="#" as="span">
                        <Link to={'/blogs'}>blogs</Link>
                      </Nav.Link>
                      <Navbar.Text>
                        {user.name} logged in <button onClick={handleLogout}>logout</button>
                      </Navbar.Text>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
                <br/>
                <h3>{user.name}</h3>
                <h4>Added blogs</h4>
                {!foundUser ? (
                  null
                ) : (
                  <Table striped>
                    <tbody>
                      {foundUser.blogs.map((blog) =>

                        <tr key={blog.id}>
                          <td>
                            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                          </td>
                        </tr>
                      )}

                    </tbody>
                  </Table>



                )}
              </div>

            )
          }
        </Route>

        <Route path="/blogs">
          {user === null ? (
            <div>
              <h1>BlogList</h1>
              <Notification />
              <h2>Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Label>username:</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                  />
                  {/* <input
                    id='username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                /> */}

                  <Form.Label>password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  {/* <input
                    id='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  /> */}
                  <Button variant="primary" type="submit">
                  Login
                  </Button>
                </Form.Group>
              </Form>
            </div>):(
            <div>
              <h1>BlogList</h1>
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                      <Link to={'/users'}>users</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                      <Link to={'/blogs'}>blogs</Link>
                    </Nav.Link>
                    <Navbar.Text>
                      {user.name} logged in <button onClick={handleLogout}>logout</button>
                    </Navbar.Text>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <br/>
              <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
                <BlogForm />
              </Togglable>
              <br/>

              <Table striped bordred hover variant="light">
                <tbody>
                  {blogs.sort(byLikes).map(blog =>
                    <tr key={blog.id}>
                      <td>
                        <Blog
                          key={blog.id}
                          blog={blog}
                          handleLike={handleLike}
                          handleRemove={handleRemove}
                          own={user.username===blog.user.username}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {/* {blogs.sort(byLikes).map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLike={handleLike}
                  handleRemove={handleRemove}
                  own={user.username===blog.user.username}
                />
              )} */}

            </div>
          )}
        </Route>

        <Route path="/users">
          {user === null ? (
            <div>
              <h1>BlogList</h1>
              <Notification />
              <h2>Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Label>username:</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                  />
                  {/* <input
                    id='username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                /> */}

                  <Form.Label>password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  {/* <input
                    id='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  /> */}
                  <Button variant="primary" type="submit">
                  Login
                  </Button>
                </Form.Group>
              </Form>
            </div>):(
            <div>
              <h1>BlogList</h1>
              <Notification/>
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                      <Link to={'/users'}>users</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                      <Link to={'/blogs'}>blogs</Link>
                    </Nav.Link>
                    <Navbar.Text>
                      {user.name} logged in <button onClick={handleLogout}>logout</button>
                    </Navbar.Text>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              {/* <p><Link to={'/users'}>users</Link> <Link to={'/blogs'}>blogs</Link>
                {user.name} logged in <button onClick={handleLogout}>logout</button>
              </p> */}
              <br/>
              <h2>Users</h2>
              <Table striped>
                <thead>
                  <tr>
                    <th></th>
                    <th>Added Blogs</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user =>
                    <tr key={user.id}>
                      <td>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                      </td>
                      <td>
                        {user.blogs.length}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Route>

        <Route path="/">
          <div>
            <h1>BlogList</h1>
            <Notification />
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group>
                <Form.Label>username:</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
                {/* <input
                    id='username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                /> */}

                <Form.Label>password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
                {/* <input
                    id='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  /> */}
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Route>

      </Switch>
    </div>
  )
}

export default App