import React from 'react';
// 引入css进行页面美化
import styles from './IndexPage.css'
import { Link } from 'dva/router';
import {Layout, Menu, Icon,} from 'antd';


const { Header, Content, Footer, Sider } = Layout;
class MainPage extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh'}}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
        style={{
          opacity: 0.9,
        }}
        >
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
            <Menu.Item key="0">
                <Icon type="home" />
                <span className={styles.logo}>E洁家政</span>
            </Menu.Item>
            
            <Menu.Item key="1">
              <Link to="/customer">
                <Icon type="user" />
                <span className={styles.navitem}>顾客管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/category">
                <Icon type="menu" />
                <span className={styles.navitem}>分类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Link to="/product">
                <Icon type="inbox" />
                <span className={styles.navitem}>商品管理</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="4">
            <Link to="/waiter">
                  <Icon type="team" />
                  <span className={styles.navitem}>员工管理</span>
              </Link>
            </Menu.Item>
           
           
            <Menu.Item key="5">
              <Link to="/comment">
                <Icon type="message" />
                <span className={styles.navitem}>评价管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/order">
                <Icon type="container" />
                <span className={styles.navitem}>订单管理</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
           <Header style={{ background: '#fff', padding: 0 }}>
           <Link to="/login"/>
           </Header>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{this.props.children ? this.props.children : <h1 className={styles.title}>
           
            </h1>}</div>
          </Content>
          <Footer className={styles.Footer} style={{ textAlign: 'center'}}>E洁家政后台管理系统</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainPage;