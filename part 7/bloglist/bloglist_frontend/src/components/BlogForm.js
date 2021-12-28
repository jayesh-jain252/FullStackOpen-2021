// import React, { useState } from 'react'
// // import { connect } from 'react-redux'
// // import { createBlog } from '../reducers/blogReducer'
// // import { createNotificationAction } from '../reducers/notificationReducer'

// import Notification from './Notification'

// const BlogForm = ({ createBlog }) => {
//   const [newTitle, setNewTitle] = useState('')
//   const [newAuthor, setNewAuthor] = useState('')
//   const [newUrl, setNewUrl] = useState('')
//   const [ notification, setNotification ] = useState(null)

//   const notifyWith = (message, type='success') => {
//     setNotification({ message, type })
//     setTimeout(() => {
//       setNotification(null)
//     }, 5000)
//   }

//   const addBlog = (event) => {

//     event.preventDefault()
//     createBlog({
//       title: newTitle,
//       author: newAuthor,
//       url: newUrl
//     })
//     notifyWith(`A new blog ${newTitle} by ${newAuthor} added`)
//     setNewTitle('')
//     setNewAuthor('')
//     setNewUrl('')
//   }

//   return (
//     <div className="formDiv">
//       <Notification notification={notification} />
//       <h2>Create new</h2>
//       <form onSubmit={addBlog}>
//         <div className='title'>
//                 Title
//           <input
//             id='title'
//             type="text"
//             value={newTitle}
//             name="title"
//             onChange={({ target }) => setNewTitle(target.value)}
//           />
//         </div>
//         <div className='author'>
//                 Author
//           <input
//             id='author'
//             type="text"
//             value={newAuthor}
//             name="author"
//             onChange={({ target }) => setNewAuthor(target.value)}
//           />
//         </div>
//         <div className='url'>
//                 Url
//           <input
//             id='url'
//             type="text"
//             value={newUrl}
//             name="url"
//             onChange={({ target }) => setNewUrl(target.value)}
//           />
//         </div>
//         <br/>
//         <button id="create" type="submit">Create</button>
//       </form>
//     </div>
//   )
// }

// export default BlogForm

// import React from 'react'
// import { connect } from 'react-redux'
// import { createBlog } from '../reducers/blogReducer'
// import { createNotificationAction } from '../reducers/notificationReducer'

// const BlogForm = (props) => {

//   const addBlog = (event) => {

//     event.preventDefault()
//     const title = event.target.title.value
//     const author = event.target.author.value
//     const url = event.target.url.value

//     const blogObject = {
//       title,author,url
//     }

//     event.target.title.value=''
//     event.target.author.value=''
//     event.target.url.value=''

//     props.createBlog(blogObject)
//     props.createNotificationAction(`A new blog ${title} by ${author} added`,'success')
//   }

//   return (
//     <div className="formDiv">
//       <h2>Create new</h2>
//       <form onSubmit={addBlog}>
//         <div className='title'>
//                 Title
//           <input
//             id='title'
//             type="text"
//             name="title"
//           />
//         </div>
//         <div className='author'>
//                 Author
//           <input
//             id='author'
//             type="text"
//             name="author"
//           />
//         </div>
//         <div className='url'>
//                 Url
//           <input
//             id='url'
//             type="text"
//             name="url"
//           />
//         </div>
//         <br/>
//         <button id="create" type="submit">Create</button>
//       </form>
//     </div>
//   )
// }

// const mapDispatchToProps = {
//   createBlog,createNotificationAction
// }


// export default connect(
//   null,mapDispatchToProps
// )(BlogForm)

import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { createNotificationAction } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const blogToCreate = {
      title: title,
      author: author,
      url: url
    }

    dispatch(createBlog(blogToCreate))
    dispatch(
      createNotificationAction(`Blog ${title} successfully created`, 'success')
    )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          author
          <input
            type="text"
            name="author"
            id="author"
          />
        </div>
        <div>
          title
          <input
            type="text"
            name="title"
            id="title"
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            id="url"
          />
        </div>
        <button id="create">create</button>
      </form>
    </div>
  )
}

export default BlogForm