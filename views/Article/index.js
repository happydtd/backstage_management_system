import React, { Component } from 'react'
import { Card, Button, Table, Modal, Typography, message} from 'antd';
import { getArticles , deleteArticleId} from '../../requests'
import moment from 'moment'
import XLSX from 'xlsx'
const ButtonGroup = Button.Group

const titleDisplayMap = {
  id: 'id',
  title: 'Title',
  author: 'Author',
  createAt: 'Create Time',
  amount: 'Reader Count'
}

export default class ArticleList extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [
        // {
        //   key: '1',
        //   name: '胡彦斌',
        //   age: 32,
        //   address: '西湖区湖底公园1号',
        // },
        // {
        //   key: '2',
        //   name: '胡彦祖',
        //   age: 42,
        //   address: '西湖区湖底公园1号',
        // },
      ],
      columns: [
        // {
        //   title: 'name',
        //   dataIndex: 'name',
        //   key: 'name',
        // },
        // {
        //   title: 'age',
        //   dataIndex: 'age',
        //   key: 'age',
        // },
        // {
        //   title: 'address',
        //   dataIndex: 'address',
        //   key: 'address',
        // },
        // {
        //     title: 'actions',
        //     dataIndex: 'actions',
        //     key: 'actions',
        //     render:(text, record, index)=>{
        //         return <Button>edit</Button>
        //     }
        //   },
      ],
      total: 0,
      isLoading: false,
      offset:0,
      limited:10,
      current:0
    }
  }

  createColumns = (columnkeys) => {
    const columns = columnkeys.map(
      item => {

        if (item === 'createAt') {
          return {
            title: titleDisplayMap[item],
            //key: item,
            render: (test, record) => {
              const { createAt } = record
              return moment(createAt).format('DD.MM.YYYY hh:mm:ss')
            }
          }
        }
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          //key: item,
        }
      }
    )
    columns.push(
      {
        title: 'action',
        key:'action',
        render:(record)=>{
          return (<ButtonGroup>
                  <Button size="small" type="primary" onClick={this.toEdit.bind(this, record)}>Edit</Button>
                  <Button size="small" type="danger" onClick={this.deleteArticle.bind(this, record)}>Delete</Button>
                  </ButtonGroup>)
        }
      }
    )
    return columns
  }

  toEdit=(record)=>{
    this.props.history.push({
      pathname:'/admin/article/edit/:'+record.id,
      state:{
        title:record.title
      }
    })
  }

  deleteArticle=(record)=>{
    const modal = Modal.confirm({
      title: <Typography>confirm to delete <span style={{color:'#f00'}}>{record.title}</span>?</Typography>,
      content: `be careful to delete`,
      okText:'quickly',
      cancelText:'no no no',
      onOk: ()=>{
        deleteArticleId(record.id)
        .then(resp=>{
          message.success(resp.msg)

          this.setState({
            ...this.state,
            offset:0,
            current:0
          }, ()=>{
            //problem here
            this.getData()
          })
          
        })
      }
    })
  }

  getData = () => {
    console.log('set' + this.state.offset)
    this.setState(
      {
        ...this.state,
        isLoading: true,
      }
    )
    
    
    getArticles(this.state.offset, this.state.limited)
      .then(resp => {
        const columnkeys = Object.keys(resp.list[0])
        const columns = this.createColumns(columnkeys)
        this.setState(
          {
            ...this.state,
            total: resp.total,
            dataSource: resp.list,
            columns,

          }
        )
       })
       .catch(err=>{

       })
       .finally(()=>{
        this.setState(
          {
            ...this.state,
            isLoading: false,
          }
        )
       })
  }

  onPageChange=(page, pageSize) =>
  {
    this.setState(
      {
        ...this.state,
        offset: pageSize *(page-1),
        limited:pageSize,
        current:page
      }, ()=>{
        this.getData()
      }
    )
  }

  componentDidMount() {
    this.getData()

  }

  toExcel=()=>{
    //in real project,frond end will send a ajax request to server and server will return a file link to download
    const data = [Object.keys(this.state.dataSource[0])]
    for (let i=0; i<this.state.dataSource.length;i++)
    {
      data.push(
        [
          this.state.dataSource[i].id,
          this.state.dataSource[i].title,
          this.state.dataSource[i].author,
          this.state.dataSource[i].amount,
          moment(this.state.dataSource[i].createAt).format('YYYY.MM.DD HH:mm:ss')
        ]
      )
      //data.push(Object.values(this.state.dataSource[i]))
    }

    const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, `articles-${this.state.offset/this.state.limted+1}-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
  }

  render() {
    return (
      <Card
        title="Card title"
        bordered={false}
        extra={<Button onClick={this.toExcel}>export to excel</Button>}>

        <Table
          rowKey = {record=>record.id}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading = {this.state.isLoading}
          pagination={{
            showQuickJumper: true,
            total: this.state.total,
            hideOnSinglePage: true,
            current: this.state.current,
            defaultCurrent:1,
            onChange: this.onPageChange
          }}
        />
      </Card>
    )
  }
}
