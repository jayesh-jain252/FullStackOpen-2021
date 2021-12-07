import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog,increaseLikes,deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle} className='blog'>
      <div>
        <p>{blog.title} {blog.author}</p>
        <Togglable buttonLabel='View' reversebuttonLabel="Hide" >
          <p className="url">{blog.url}</p>
          <p className="likes">Likes : {blog.likes} <button id='likebutton' className='likeButton' onClick={increaseLikes}>Like</button></p>
          <p>Blog Creator : {blog.user.name}</p>
          <p className="remove"><button onClick={deleteBlog} id='deletebutton'>Remove</button></p>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog