import React from 'react'

const Notification = ({ message }) => {
  if (message === null || message === ''){
    return null
  }
  return(
    <p className={message.class}>{message.message}</p>
  )
}

export default Notification
