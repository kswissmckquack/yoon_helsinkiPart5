import React, { useState } from 'react'

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return(
    <form onSubmit={handleLogin}>
      <div>
        <h2>Login</h2>
        <div>
          username: <input
                    type="text"
                    value={ username }
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    />
        </div>
        <div>
          password: <input
                    type="password"
                    value={ password }
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    />
        </div>
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )
}

export default LoginForm
