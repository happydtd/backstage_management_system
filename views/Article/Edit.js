import React, { Component } from 'react'
import { Card, Button, Table, Modal, Typography, message} from 'antd';

export default class ArticleEdit extends Component {
    render() {
        return (
            <Card
            title="Edit article"
            bordered={false}
            extra={<Button>Cancel</Button>}>
    
                Article edit
            </Card>
        )
    }
}
