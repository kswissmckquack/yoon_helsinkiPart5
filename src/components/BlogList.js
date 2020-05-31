import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user }) => {
  return(
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <p>{user.name} logged in </p><button>logout</button>
    </div>
  )
}

export default BlogList
