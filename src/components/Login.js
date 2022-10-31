import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, message, Checkbox, Form, Input } from 'antd';
import React from "react";
import axios from "axios";

import {Link} from 'react-router-dom'
import { BASE_URL } from "../constants";


function Login(props) {
    const onFinish = (values) => {
        //step1:get username and password
        //step2: send login request to the server
        //step3 get response from the server
            //case 1: succusss-> props.cb to inform app (pass token to app)
            //case 2: fail ->inform users login failed
        const {username, password} =values
        //配置
        const opt ={
            method:"POST",
            url: `${BASE_URL}/signin`,
            data:{
                username:username,
                password:password
            },
            headers: {"Content-Type":"application/json"}
        }
        //配置信息，配置好之后就可以发送请求了，把opt发送过去
        //axios(opt)返回的是个对象，这个对象是promise，下面有.then的方法
        //怎么知道信息的response的成功与否呢，通过.then来处理成功，.catch是失败的获取
        axios(opt)
            .then(res =>{
                if(res.status ===200){
                    const {data} =res
                    //数据回传app
                    props.handleLoggedIn(data)
                    message.success("Login succeed! ");
                }
            })
            .catch( err=>{
                console.log("login failed: ", err.message);
                message.error("Login failed!");
            })
        
        };
      return (
        <Form
          className ="login-form"
          name="normal_login"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to ='/register'>register now!</Link>
          </Form.Item>
        </Form>
      );
 }


export default Login;