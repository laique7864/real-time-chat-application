import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../login/login-form.css';
import { Form, Input, Button, Checkbox, Flex } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import Loader from '../../components/loader';
import { useNavigate } from 'react-router-dom';

export  const SignUpForm = () => {
    const [loading,setLoading]= useState(false)
    const navigate = useNavigate()
  const onFinish =async (values:any)  => {
try {
    setLoading(true)
    await  axios.post("http://localhost:4000/api/v1/user/create",values)
    navigate('/login')
    setLoading(false)

} catch (error) {
    setLoading(false)

}
  
  };
//   {
//     "firstName": "rizwan",
//     "lastName": "shaikh",
//     "password": "password",
//     "userName": "userName123",
//     "email": "email123@gmail.com"
// }

  return (
    <Flex  style={{
        height:'100vh'
    }} justify={'center'} align={'center'}>

       {loading && 
        <Loader/>
       } 
 <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[
          {
            required: true,
            message: 'Please input your firstName!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="firstName" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          {
            required: true,
            message: 'Please input your lastName!',
          },
        ]}
      >
        <Input
          placeholder="lastName"
        />
      </Form.Item>
     
      <Form.Item
        name="userName"
        rules={[
          {
            required: true,
            message: 'Please input your userName!',
          },
        ]}
      >
        <Input
          placeholder="userName"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
            
          },
        ]}
      >
        <Input
          placeholder="email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign Up
        </Button>

      </Form.Item>
    </Form>
    </Flex>
   
  );
};

