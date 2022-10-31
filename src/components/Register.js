import React from "react";
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

import { BASE_URL } from "../constants";

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
};
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
};
function Register(props) {
    //hook: useForm, return an array, form has a lot of method
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        //step1:get username and password
        //step2: send Register request to the server
        //step3 get response from the server
            //case 1: succusss-> go to login page
            //case 2: fail ->inform users register failed
        const {username, password} = values
        const opt ={
            method:"POST",
            url: `${BASE_URL}/signup`,
            data:{
                username:username,
                password:password
            },
            headers: {"Content-Type":"application/json"}
        }
        axios(opt)
            .then(res =>{
                if(res.status ===200){
                    //go to login
                    props.history.replace('/login') //or push method
                    message.success("Registration succeed! ");
                }
            })
            .catch( err=>{
                console.log("Registration failed: ", err.message);
                message.error("Registration failed!");
            })
      };
 return (<Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={onFinish}
    className="register"
    >
    <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
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
          //fetfieldvalue 后面跟着校验的情况，通过validato，首先看你值存不存在
          //然后通过get field方法拿到password的值，然后来进行比较
          //如果value==拿到的password，那么相同
          //否则他俩不同
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" className="register-btn">
          Register
        </Button>
      </Form.Item>
    </Form>
    );
}

export default Register;