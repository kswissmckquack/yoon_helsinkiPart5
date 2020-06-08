import React, { useState } from 'react'

const BlogForm = ({ user, blogService, setNotification, setBlogs, blogs, blogFormRef }) => {
  const [newBlog, setNewBlog] = useState({
    author: null,
    title: null,
    url: null
  })
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')

  const handleBlogAdded = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    console.log('Adding Note')
    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user,
    }
    console.log(newBlog)
    blogService
      .create(newBlog)
      .then(returnedBlog => {
          const blogAddedNotification = {
            message: `Success: ${returnedBlog.title} added`,
            class: 'success'
          }
          setNotification(blogAddedNotification)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog('')
      })
  }

  return(
    <form onSubmit={ handleBlogAdded }>
      <h2>Create Blog</h2>
      <div>
      Title: <input
              type="text"
              value={ newBlog.title }
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              />
      </div>
      <div>
      Author: <input
              type="text"
              value={ newBlog.author }
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              />
      </div>
      <div>
      Url: <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm
