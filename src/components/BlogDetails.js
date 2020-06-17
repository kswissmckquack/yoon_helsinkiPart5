import React from 'react'

const BlogDetails = ({ blog, showDetailsRef }) => {

  return(
    <div>
      <p>blog.url}</p>
      <p>{blog.likes}</p><button type="button">like</button>
      <p>{blog.author}</p>
    </div>
  )
}

export default BlogDetails
