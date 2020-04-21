import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd'
import { DownOutlined } from '@ant-design/icons';

import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import logo from './logo.png'
import './frame.less'
import { withRouter } from 'react-router-dom'
import { findByLabelText } from '@testing-library/react';
import { connect } from 'react-redux'
import {getNotificationList} from '../../actions/notifications'
import {logout} from '../../actions/user'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const mapState = state => {
  return {
    notificationsCount: state.notifications.list.filter(item => item.hasRead === false).length,
    avatar: state.user.avatar,
    displayName: state.user.displayName
  }
}
@withRouter
@connect(mapState, {getNotificationList, logout})

class Frame extends Component {
  componentDidMount(){
    this.props.getNotificationList()
  }

  onMenuClick = ({ item, key, keyPath, domEvent }) => {
    console.log({ item, key, keyPath, domEvent })
    console.log(this.props)
    this.props.history.push(key)
  }

  onDropdownMenuClick = ({ key }) => {
    if (key === '/logout')
    {
      this.props.logout();
    }
    else
    {
    this.props.history.push(key)
    }
  }

  renderDropdown = () => (
    <Menu onClick={this.onDropdownMenuClick}>
      <Menu.Item key="/admin/notifications">
        <Badge dot={Boolean(this.props.notificationsCount)}>
          notice
        </Badge>
      </Menu.Item>
      <Menu.Item key="/admin/profile">

        person setting

    </Menu.Item>
      <Menu.Item key="/logout">

        exit

    </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Layout>
        <Header className="qf-header" style={{ backgroundColor: '#fff' }}>
          <div className="qf-logo" >
            <img src={logo} alt="QF" />
          </div>
          <div>
            <Dropdown overlay={this.renderDropdown()}>

              <div style={{ display: 'flex', alignItems: 'center' }} >
                <Avatar src={this.props.avatar} />
                <span>Welcome! {this.props.displayName}</span>
                <Badge count={this.props.notificationsCount} offset={[-10, -10]}>
                  <DownOutlined />
                </Badge>
              </div>

            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background" style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[this.props.location.pathname]}
              defaultOpenKeys={['sub1']}
              onClick={this.onMenuClick}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                this.props.menus.map(item => {
                  return (
                    <Menu.Item key={item.pathname}>
                      {item.title}
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame
