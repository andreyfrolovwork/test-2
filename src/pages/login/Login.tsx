import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '@/processes/redux/authSlice'
import { useAppSelector } from '@/processes/redux/hooks'

const { Title } = Typography

const Login: React.FC = () => {
  const navigate = useNavigate()
  const auth = useAppSelector(state => {
    return state.auth
  })
  useEffect(() => {
    if (auth.isAuth) {
      if (auth.user.role === 'artist') {
        navigate('/panel', { replace: true })
      } else if (auth.user.role === 'admin') {
        navigate('/admin-panel', { replace: true })
      } else if (auth.user.role === 'admin_not_activated') {
        navigate('/your-account-not-activated', { replace: true })
      }
    }
  }, [auth, navigate])
  const dispatch = useDispatch()
  const onFinish = (values: { username: string; password: string }) => {
    dispatch<any>(
      login({
        email: values.username,
        password: values.password,
      }),
    )
  }

  return (
    <div className={'login-page'}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div className={'dflex fdcolumn aicenter jccenter'}>
          <Title>Test task</Title>
          <Title level={5}>Andrey Frolov</Title>
          <br />
        </div>

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to={'/signup'}>register now!</Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
