import React from 'react'
import {Button,Tabs} from 'antd'


class ProductDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      product:{},
      
    }
  }

  componentDidMount(){
    let payload = this.props.location.payload;
    if(payload){
      this.setState({pruduct:payload})
      
    } else {
      this.props.history.push("/product")
    }
  }
  
   
  render(){
    const { TabPane } = Tabs;
    
    function callback(key) {
      console.log(key);
    }

    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="基本信息" key="1">
          <p>{this.state.product.name}</p>
          <p>{this.state.product.price}</p>
          <p>{this.state.product.description}</p>
         
            <img alt="图片找不到..." src={this.state.product.photo}/>
          </TabPane>
        </Tabs>
        <Button type="link" onClick={()=>{this.props.history.goBack()}}>返回</Button>
      </div>
    )
  }
}

export default ProductDetails;