import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import CustomerPage from './routes/CustomerPage'
import ProductPage from './routes/ProductPage';
import AddressPage from './routes/AddressPage';
import CategoryPage from './routes/CategoryPage';
import CommentPage from './routes/CommentPage';
import OrderPage from './routes/OrderPage';
import WaiterPage from './routes/WaiterPage';
import MainPage from './routes/MainPage';
import CustomerDetails from './routes/CustomerDetails'

function RouterConfig({ history }) {
  return (
    <Router history={history}>

      <Switch>
      <Route path="/" exact component={MainPage} />
<MainPage>
        <Route path="/" exact component={IndexPage} />
        <Route path="/customer" exact component={CustomerPage} />
        <Route path="/product" exact component={ProductPage} />
        <Route path="/address" exact component={AddressPage} />
        <Route path="/category" exact component={CategoryPage} />
        <Route path="/waiter" exact component={WaiterPage} />
        <Route path="/comment" exact component={CommentPage} />
        <Route path="/order" exact component={OrderPage} />
        <Route path="/customerDetails" exact component={CustomerDetails} />
      
      </MainPage>
        </Switch>
</Router>
  ); 
}

export default RouterConfig;
