import React, { useState, useContext } from "react";
import { Form, Icon, Input, Button } from 'antd';
import {  Redirect } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../context/auth";

function LoginForm (props) {
  
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext)
  //const referer = props.location.state.referer || '/';

  const handleSubmit = e => {

    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        let data = {
          username:email,
          password:password
        }
        
        let headers= {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
        }
        
        axios.post("http://localhost:8000/api/v1/token-auth/", data, headers)
        .then(result => {
          if (result.status === 200) {
            setToken(result.data.token);
            setLoggedIn(true);
          } else {
            setIsError(true);
          }
        }).catch(e => {
          setIsError(true);
        });

      }
    });

  };

   if (isLoggedIn) {
     return <Redirect to="/install" />;
   }

    const { getFieldDecorator } = props.form;
    return (
      <div className="login-container">
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              setfieldsvalue={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              setfieldsvalue={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          { isError &&<h3>The username or password provided were incorrect!</h3> }

        </Form.Item>
      </Form>
      </div>
    );

}

const LoginView = Form.create({ name: 'normal_login' })(LoginForm);

export default LoginView