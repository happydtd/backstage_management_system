import React, { Component } from 'react'
import { Card,List, Button, Badge, Spin} from 'antd'
import {connect} from 'react-redux'
import {markNotificationAsReadById, markAllNotificationAsRead} from '../../actions/notifications'

const mapState=state=>{
    const{
        list =[],
        isLoading
    } = state.notifications
    return{
        list:list,
        isLoading:isLoading
    }
}

@connect(mapState, {markNotificationAsReadById, markAllNotificationAsRead})
class Notifications extends Component {
    render() {
        console.log(this.props.isLoading)
        return (
            <Spin spinning={this.props.isLoading}>
            <Card
                title="Notifications"
                bordered={false}
                extra={<Button 
                    disabled={this.props.list.every(item=>item.hasRead === true)}
                    onClick={this.props.markAllNotificationAsRead}
                    >All read
                    </Button>}>

                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    renderItem={item => (
                        <List.Item
                        extra={item.hasRead?null:<Button onClick={this.props.markNotificationAsReadById.bind(this,item.id)}>Read</Button>}
                        >
                            <List.Item.Meta
                                 title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                />
            </Card>
            </Spin>
        )
    }
}

export default Notifications