import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Card, Spin  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less';
import {connect} from 'react-redux'
import {login} from '../../actions/user'
import {Redirect} from 'react-router-dom'

const mapState = state =>({
    isLogin : state.user.isLogin,
    isLoading: state.user.isLoading
})

@connect(mapState, {login})
class Login extends Component {
    onFinish = values => {
        console.log('Received values of form: ', values);
        this.props.login(values)
    };

    render() {
        return (
            !this.props.isLogin
            ?
            <Card
                title='CCKM login'
                className="qf-login-wrapper"
            >
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
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
                    <Input 
                        disabled={this.props.isLoading} 
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username" />
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
                        disabled={this.props.isLoading}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox disabled={this.props.isLoading}>Remember me</Checkbox>
                    </Form.Item>

                </Form.Item>

                <Form.Item>
                    <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
                        Log in
        </Button>
                </Form.Item>
            </Form>
            </Card>
            :
            <Redirect to='/admin' />
        );
    };
}

export default Login

