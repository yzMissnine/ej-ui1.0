//服务员管理页面

import React from 'react';
import styles from './WaiterPage.css';
import { Button, Table,Popconfirm,message, } from 'antd';
import axios from '../utils/axios'
import WaiterForm from './WaiterForm'


class WaiterPage extends React.Component {
  //局部状态state
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      loading: true,
      list: [],
      visible: false,
 
    } 
  }
  UNSAFE_componentWillMount() {
    this.handlerLoad();
  }
  //   componentDidMount() {
  //     // 查询数据，进行数据绑定

  //     // this.reloadDate();
  //   }

  //封装查询用户
  handlerLoad() {
    axios.get("/waiter/findAll")
      .then((result) => {
        //console.log('查询到的数据为：',result.data);
        //将查询到的数据设置到state中
        this.setState({
          list: result.data,
          loading: false
        })
      })
  }
  //删除用户
  handleDelete(id) {
    let obj = { 'id': id }
    axios.post("/waiter/deleteById", obj)
      .then((result) => {
        if (200 === result.status) {
          message.success(result.statusText)
          this.handlerLoad();
        }
      })
  }
  batchDelete = () => {
    axios.post("/waiter/batchDelete", { ids: this.state.selectedRowKeys })
      .then((result) => {
        if (200 === result.status) {
          message.success(result.statusText)
          this.handlerLoad();
        }
      })
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });

  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // 表单校验完成后与后台通信进行保存
      axios.post("/waiter/saveOrUpdate", values)
        .then((result) => {
          message.success(result.statusText)
          // 重置表单
          form.resetFields();
          // 关闭模态框
          this.setState({ visible: false });
          this.handlerLoad();
        })

    });
  };
  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  //添加
  toAdd() {
    this.setState({ waiter: {}, visible: true })
  }
  //更新
  toEdit(record) {
    //alert(JSON.stringify(record));
    this.setState({ waiter: record })
    this.setState({ visible: true })

  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    let text = "是否删除"
    let columns = [{
      title: "工号",
      dataIndex: "id"
    }, {
      title: "电话",
      dataIndex: "telephone"
    }, {
      title: "密码",
      dataIndex: "password"
    }, {
      title: "姓名",
      dataIndex: "realname"
    }, {
      title: "卡号",
      dataIndex: "idcard"
    }, {
      title: "状态",
      dataIndex: "status"
    }, {
      title: "操作",
      render: (table, Record) => {
        return (
          <div>
            <Popconfirm placement="top" title={text}
              onConfirm={this.handleDelete.bind(this, Record.id)} okText="是" cancelText="否">
              <Button size="small" type="link">删除</Button>
            </Popconfirm>

            <Button size="small"  type="link" onClick={this.toEdit.bind(this, Record)}>修改</Button>
          </div>
        )
      }
    }]

    //返回结果
    return (
      <div className="waiter">
        <div className={styles.header}>服务员管理</div>

        <div className={styles.buttonsbmit}>
          &nbsp;<Button  onClick={this.toAdd.bind(this)}>添加人员</Button>
          &nbsp;
        
          {/* &nbsp;<Button type="link" onClick={() => { window.location.href = "/" }}>返回首页</Button> */}
        </div>
        <Table 
          rowKey="id"
          size="small"
          bordered
          loading={this.state.loading}

          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.list}
        />

        <WaiterForm
          initData={this.state.waiter}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate} />
      
      </div>


    )
  }
}

export default WaiterPage;