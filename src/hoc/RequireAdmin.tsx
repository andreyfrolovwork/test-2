import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRoot } from '@/processes/redux/store'
interface IRequireAdmin {
  children: React.ReactNode
}
const RequireAdmin: React.FC<IRequireAdmin> = ({ children }: any) => {
  const auth = useSelector(({ auth }: IRoot) => {
    return auth
  })
  const location = useLocation()
  if (!auth.isAuth) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }
  if (auth.user.role === 'artist') {
    return <Navigate to={'/panel'} state={{ from: location }} />
  }
  if (auth.user.role === 'admin_not_activated') {
    return <Navigate to={'/your-account-not-activated'} state={{ from: location }} />
  }
  if (auth.user.role === 'admin') {
    return children
  }
}

export default RequireAdmin
