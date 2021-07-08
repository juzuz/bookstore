import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import '../css/login.css'
import * as userService from '../services/userService'
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";


class RegisterForm extends React.Component {


    confirmPassword = (rule, value, callback) => {
        if (this.props.form.getFieldValue('confirm') === this.props.form.getFieldValue('password')) {
            return true
        }
        else
        {
            callback("Passwords do not match")
            return false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const formData = this.props.form

        formData.validateFields((err, values) => {
            if (!err) {
                //TODO@
                let data = {
                    username: formData.getFieldValue("username"),
                    password: formData.getFieldValue("password"),
                    email: formData.getFieldValue('email')
                }


                userService.register(data);

            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;




        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            iconRender = {visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined />)}
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item   >
                    {getFieldDecorator('confirm', {
                        rules: [{ required: true, message: 'Please confirm your Password!' },{validator:this.confirmPassword}],
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            iconRender = {visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined />)}
                            placeholder="Confirm Password"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{type:'email', message:"The input is not a valid email"},{ required: true, message: 'Please input your email address!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="email"
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign Up
                    </Button>
                    <a href="/login">Already have an account?</a>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegisterForm = Form.create({ name: 'normal_register' })(RegisterForm);

export default WrappedRegisterForm
