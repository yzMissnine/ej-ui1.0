//服务员管理页面

import React from 'react';
import styles from './WaiterPage.css';

import {Modal,Button,Table,message} from 'antd'
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
      address:{}
    } 
  }
  componentDidMount(){
    this.reloadData();
}
reloadData(){
    this.setState({loading:true});
    axios.get("/address/findAll")
    .then((result)=>{
        this.setState({list:result.data})
    })
    .finally(()=>{
        this.setState({loading:false});
    })
}
  
   // 批量删除
   handleBatchDelete(){
    Modal.confirm({
        title: '确定删除这些记录吗?',
        content: '删除后数据将无法恢复',
        onOk:() => {
            axios.post("/waiter/batchDelete",{ids:this.state.ids})
            .then((result)=>{
            //批量删除后重载数据
            message.success(result.statusText)
            this.reloadData(); 
            })
        }
    })
}
// 单个删除
handleDelete(id){
    Modal.confirm({
        title: '确定删除这条记录吗?',
        content: '删除后数据将无法恢复',
        onOk:() => {
          // 删除操作
          axios.get("/waiter/deleteById",{
            params:{
              id:id
            }
          })
          .then((result)=>{
            // 删除成功后提醒消息，并且重载数据
            message.success(result.statusText);
            this.reloadData();
            })
        }
    });
}


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
      render: (table, record) => {
        return (
          <div>
          <Button type='link' size="small" onClick={this.handleDelete.bind(this,record.id)}>删除</Button>
          <Button type='link' size="small" onClick={this.toEdit.bind(this,record)}>修改</Button>
        </div>
        )
      }
    }]

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // 当用户操作复选按钮的时候，将值获取到并且保存到state中
        this.setState({
          ids:selectedRowKeys
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };  

    //返回结果
    return (
      <div className={styles.address}>
        <div className={styles.title}>服务员管理</div>
        <div className={styles.btns}>
          <Button  onClick={this.toAdd.bind(this)}>添加人员</Button> &nbsp;
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