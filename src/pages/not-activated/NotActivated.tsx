import React from 'react'
import { logout } from '@/processes/redux/authSlice'
import { useAppDispatch } from '@/processes/redux/hooks'
import { Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Title } = Typography

const NotActivated = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    setTimeout(() => {
      navigate('/login', { replace: true })
    }, 500)
  }

  return (
    <div className={'dflex aicenter jccenter fdcolumn hvh100'}>
      <Title>Your account not activated</Title>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default NotActivated
