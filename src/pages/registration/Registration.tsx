import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { signup } from '@/processes/redux/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/processes/redux/hooks'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const Registration = () => {
  const navigate = useNavigate()

  const isAuth = useAppSelector(({ auth }) => {
    return auth.isAuth
  })
  useEffect(() => {
    if (isAuth) {
      navigate('/panel', { replace: true })
    }
  }, [isAuth, navigate])
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const onFinish = (values: any) => {
    dispatch<any>(
      signup({
        email: values.email,
        password: values.password,
        isArtist: values.isArtist,
      }),
    )
  }

  return (
    <div className={'reg-page'}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
          isArtist: true,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Registration
