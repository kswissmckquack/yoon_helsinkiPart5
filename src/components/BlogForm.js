import React from 'react'

const BlogForm = ({ newBlog, setTitle, setAuthor, setUrl, handleBlogAdded }) => {
  return(
    <form onSubmit={ handleBlogAdded }>
      <h2>Create New </h2>
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
