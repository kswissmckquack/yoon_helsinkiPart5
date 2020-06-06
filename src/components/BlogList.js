import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, handleLogout }) => {
  return(
    <form onSubmit={handleLogout}>
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <p>{user.name} logged in </p><button type="submit">logout</button>
    </div>
    </form>
  )
}

export default BlogList
