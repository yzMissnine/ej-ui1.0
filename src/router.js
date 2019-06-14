import React from 'react';
import { Router, Route, Switch ,Link} from 'dva/router';
import IndexPage from './routes/IndexPage';
import CustomerPage from './routes/CustomerPage'
import ProductPage from './routes/ProductPage';
import AddressPage from './routes/AddressPage';
import CategoryPage from './routes/CategoryPage';
import CommentPage from './routes/CommentPage';
import styles from './router.css'

function RouterConfig({ history }) {
  return (
    <Router history={history}>

    <div className={styles.container}>
          <div className={styles["left-nav"]}>
            <div className={styles.title}>E洁家政管理系统</div>
            <ul>
              <li className={styles["nav-list-item"]}><Link to="/customer">顾客管理</Link></li>
              <li className={styles["nav-list-item"]}><Link to="/product">产品管理</Link></li>
              <li className={styles["nav-list-item"]}><Link to="/address">地址管理</Link></li>
              <li className={styles["nav-list-item"]}><Link to="/category">状态管理</Link></li>
              <li className={styles["nav-list-item"]}><Link to="/comment">评论管理</Link></li>
            </ul>
</div>
 <div className={styles["right-content"]}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/customer" exact component={CustomerPage} />
        <Route path="/product" exact component={ProductPage} />
        <Route path="/address" exact component={AddressPage} />
        <Route path="/category" exact component={CategoryPage} />
        <Route path="/comment" exact component={CommentPage} />
      </Switch>
     </div>
</div>
    </Router>
  ); 
}

export default RouterConfig;
