import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/processes/redux/hooks'

const Redirect: React.FC = () => {
  const auth = useAppSelector(({ auth }) => {
    return auth
  })
  const location = useLocation()
  if (auth.isAuth && auth.user.role === 'artist') {
    return (
      <React.Fragment>
        <Navigate to={'/panel'} state={{ from: location }} />
      </React.Fragment>
    )
  } else if (auth.isAuth && auth.user.role === 'admin') {
    return (
      <React.Fragment>
        <Navigate to={'/admin-panel'} state={{ from: location }} />
      </React.Fragment>
    )
  } else if (!auth.isAuth) {
    return (
      <React.Fragment>
        <Navigate to={'/login'} state={{ from: location }} />
      </React.Fragment>
    )
  }
  return null
}

export default Redirect
