import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({
    message:'',
    classs:'',
  })
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

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
      <Togglable buttonLabel='Create Blog' ref={blogFormRef}>
        <BlogForm
          user={ user }
          blogService={ blogService }
          setNotification={ setNotification }
          setBlogs={ setBlogs }
          blogs={ blogs }
          blogFormRef={ blogFormRef }
          />
        </Togglable>
      </>
     }
  </>
  )
}

export default App
