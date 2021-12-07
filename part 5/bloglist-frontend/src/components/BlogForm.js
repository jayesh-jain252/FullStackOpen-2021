import React, { useState } from 'react'
import Notification from './Notification'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [ notification, setNotification ] = useState(null)

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = (event) => {

    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    notifyWith(`A new blog ${newTitle} by ${newAuthor} added`)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="formDiv">
      <Notification notification={notification} />
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div className='title'>
                Title
          <input
            id='title'
            type="text"
            value={newTitle}
            name="title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div className='author'>
                Author
          <input
            id='author'
            type="text"
            value={newAuthor}
            name="author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div className='url'>
                Url
          <input
            id='url'
            type="text"
            value={newUrl}
            name="url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <br/>
        <button id="create" type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm