import React, { Component } from 'react'

import{Card, Spin, Upload} from 'antd'
import axios from 'axios'
export default class Profile extends Component {

    state={
        isUploading:false,
        avatarUrl:''
    }

    handleUploadAvatar =({file})=>{
        const data= new FormData()
        this.setState({
            isUploading: true
        })
    }

    render() {
        return (
            <Card
                title='Profile'
                bordered={false}
            >
                <Upload>
                    <span  style={{
                    border: '5px solid red', 
                    width:100, 
                    height:50, 
                    display:'block'
                    }}
                    
                    showUploadList={false}

                    customRequest={this.handleUploadAvatar}

                    >

                    <Spin spinning ={this.state.isUploading}>
                        {
                            this.state.avatarUrl?<img src={this.state.avatarUrl} alt="image"/>:<span>upload</span>
                        }
                    </Spin>
                    </span>
                </Upload>
            </Card>
        )
    }
}
