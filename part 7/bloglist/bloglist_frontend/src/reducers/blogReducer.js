import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state,action.data]

  case 'INIT_BLOGS':
    return action.data

  case 'INCREASE_LIKES': {
    const id = action.data.id
    console.log(id)
    const blogToChange = state.find(b => b.id === id)
    console.log(blogToChange)

    const changedBlog = {
      ...blogToChange,
      likes:  blogToChange.likes + 1
    }
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  }

  case 'COMMENT':{
    const id = action.data.id
    const updatedBlog = state.find((blog) => blog.id === id)
    const changedBlog = {
      ...updatedBlog,
      comments: action.data.comments
    }
    return state.map((blog) => (blog.id !== id ? blog : changedBlog))
  }

  case 'DELETE_BLOG' : {
    return state.filter((blog) => blog.id !== String(action.data))
  }

  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })

  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
    } catch (exception) {
      console.log('cannot delete blog', exception)
    }
  }
}

export const incrementLikes = (blog)  => {
  return async (dispatch) => {
    try {
      console.log(blog)
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1
      })
      dispatch({
        type: 'INCREASE_LIKES',
        data: updatedBlog
      })
    } catch (exception) {
      console.log(`cannot update blog ${blog.title}`,exception)
    }
  }
}

export const comment = (blog, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        comments: blog.comments.concat([comment])
      })
      dispatch({
        type: 'COMMENT',
        data: updatedBlog
      })
    } catch (exception) {
      console.log(`cannot update blog ${blog.title}`, 'error')
    }
  }
}

export default blogReducer