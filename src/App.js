import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    author: null,
    title: null,
    url: null
  })
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [notification, setNotification] = useState({
    message:'',
    classs:'',
  })
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(newBlogs =>
      setBlogs( newBlogs )
    )
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleBlogAdded = async (event) => {
    event.preventDefault()
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
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog('')
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      const loginNotification = {
        message: `Welcome ${user.name}`,
        class: 'success',
      }
      setNotification(loginNotification)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const newNotification = {
        message: 'Invalid Credentials',
        class: 'error',
      }
      setNotification(newNotification)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')
    setUser(null)
    window.localStorage.clear()
  }

  return (
  <>
    <Notification message={ notification } />
    { user === null ?
      <LoginForm
        username={ username }
        setUsername={ setUsername }
        password={ password }
        setPassword={ setPassword }
        handleLogin={ handleLogin }
      />
      :
      <>
      <BlogList
        blogs={ blogs }
        user={ user }
        handleLogout={ handleLogout }
      />
      <BlogForm
        newBlog= { newBlog }
        setTitle= { setTitle }
        title= { title }
        setAuthor= { setAuthor }
        setUrl= { setUrl }
        handleBlogAdded = { handleBlogAdded }
      />
      </>
     }
  </>
  )
}

export default App
