import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./login-form.css";
import { Form, Input, Button, Checkbox, Flex } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, json, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import axios from "axios";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

    const res  =await axios.post("http://localhost:4000/api/v1/user/login", values);
console.log(res.data.data ,"resresres");
localStorage.setItem('token',res.data.data.token )
localStorage.setItem('user', JSON.stringify(res.data.data.user)  )

      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Flex
      style={{
        height: "100vh",
      }}
      justify={"center"}
      align={"center"}
    >
      {loading && <Loader />}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: "Please input your userName!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="userName"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to={"/signUp"}>register now!</Link>
        </Form.Item>
      </Form>
    </Flex>
  );
};
