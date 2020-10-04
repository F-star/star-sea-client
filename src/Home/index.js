import React from 'react';
import { Table, Space, Button, Upload, message } from 'antd'
import { UploadOutlined, ReloadOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import moment from 'moment'
import { api_getFileList } from '../api/home';
import { getQuery } from '../utils/route';

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      list: [],
      urlPrefix: '',
    }
  }
  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    api_getFileList()
      .then(res => {
        const urlPrefix = res.data.url_prefix
        const list = res.data.list
        list.forEach(item => item.updated_at = moment(item.updated_at).format('YYYY-MM-DD HH:mm:ss'))
        this.setState({list, urlPrefix})
      })
  }

  render() {
    const columns = [
      { title: '名称', dataIndex: 'name', key: 'name' },
      { title: '最近更新', dataIndex: 'updated_at', key: 'aupdated_atge' },
      { title: '操作', key: 'action', render: (text, record) => (
        <Space size="middle">
          <a target={'_bank'} href={this.state.urlPrefix + record.name}>打开</a>
          <CopyToClipboard 
            text={`![image]{${this.state.urlPrefix + record.name}}`}
            onCopy={() => message.success('copied!')}
          >
            <a>markdown</a>
          </CopyToClipboard>
         
        </Space>
      ), }
    ];

    const uploadProps = {
      action: '/api/v1/upload',
      accept: 'image/*',
      showUploadList: false,
      headers: {
        Authorization: getQuery('token')
      },
      onChange: (info) => {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          this.fetchData()
        }
      },
    }

    return (
      <div style={{padding: '20px'}}>
        <div style={{position: 'relative', marginBottom: '10px'}}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} type="primary">上传</Button>
          </Upload>
          <div style={{position: 'absolute', top: '0', right: '0'}}>
            <Button icon={<ReloadOutlined />} type="primary" onClick={() => this.fetchData()}>刷新</Button>
          </div>
        </div>
        <Table 
          rowKey="name"
          dataSource={this.state.list}
          columns={columns}
          pagination={false}
        />
      </div> 
    )
  }
}

export default Home;
