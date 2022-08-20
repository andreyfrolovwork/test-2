import React, { useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'
import { logout } from '@/processes/redux/authSlice'
import { useAppDispatch, useAppSelector } from '@/processes/redux/hooks'

const items: MenuProps['items'] = [
  {
    label: 'Admin',
    key: 'SubMenu',
    icon: <UnorderedListOutlined />,
    children: [
      {
        type: 'group',
        label: 'Artists',
        children: [
          {
            label: 'All users',
            key: 'key-all-users',
          },
        ],
      },
      {
        label: 'Exit',
        key: 'key-exit',
      },
    ],
  },
]
const { Header, Content } = Layout
const AdminPanel = () => {
  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(({ auth }) => {
    return auth.isAuth
  })
  const [current, setCurrent] = useState('mail')
  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
    switch (e.key) {
      case 'key-all-users':
        navigate('users')
        break

      case 'key-exit':
        dispatch(logout())
        break
      default:
    }
  }
  if (!isAuth) {
    navigate('../login', { replace: true })
  }
  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          background: '#fff',
          padding: '0 20px',
        }}
      >
        <div className="logo" />
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </Header>
      <Content
        style={{
          position: 'relative',
          top: '64px',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  )
}

export default AdminPanel
