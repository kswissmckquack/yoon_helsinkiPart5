import React, { useState } from 'react'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, blogs, blogService }) => {
  const [likedBlog, setLikedBlog] = useState({
    author: null,
    title: null,
    url: null,
    user: null,
    likes: null
  })
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showDetailsRef = React.createRef()
  const handleLike = async (event) => {
    event.preventDefault()
    console.log('handling like')
    const newBlog = {
      ...blog,
      likes: blog.likes +1
    }
    setLikedBlog(newBlog)
    const returnedBlog = await blogService.update(newBlog)



  }
  return(
    <div style={blogStyle}>
        <p>{blog.title}</p>
        <Togglable buttonLabel='View' ref={showDetailsRef}>
            <BlogDetails
              blog={blog}
              showDetailsRef={showDetailsRef}
            />
        </Togglable>
    </div>
  )
}

export default Blog
