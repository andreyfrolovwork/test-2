import React from 'react'

interface ErrorComponent {
  message?: string
}

const Error: React.FC<ErrorComponent> = ({ message }) => {
  if (!message) {
    return <div>Something went wrong!</div>
  } else return <div>{message}</div>
}

export default Error
