import {
    List,
    Popover,
    NavBar,
    Icon,
    Flex
} from 'antd-mobile';
import $ from "jquery";
import {Link} from 'react-router';
import DetailFootComponent from './../public/detailFoot';
import QueueAnim from 'rc-queue-anim';
import * as https from './../../apis/api.jsx';

var itemid = null, itemName = null, shopItem = null;
const local = localStorage;


export default class ServerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number:1,
            show:false,
            data:[1],
            item:{}
        }
        this.back = this.back.bind(this);
        this.del = this.del.bind(this);
        this.add = this.add.bind(this);
        this.buy = this.buy.bind(this);
    }
    del = () =>{
        if(this.state.number > 0){
            this.setState({
                number:this.state.number -1
            })
        }
    }
    add = () =>{
        if(this.state.number < 6){
            this.setState({
                number:this.state.number + 1
            })
        }
    }
    back = () => {
        window.history.back();
    }
    // 添加到购物车
    buy = () =>{
        var _this = this;
        var itemid = this.props.params.name.split('&')[0];
        var num = Number(this.state.number);
        var cartArr = [];
        var cartNum = [];
        if(JSON.parse(local.getItem('cartId')) == null){// 判断如果localStorage中没有存入cartId自段就直接添加
            cartArr.push(itemid);
            cartNum.push(num);
            local.setItem('cartId',JSON.stringify(cartArr));
            local.setItem('cartNum',JSON.stringify(cartNum));
        }else{
            cartArr = JSON.parse(local.getItem('cartId'));
            cartNum = JSON.parse(local.getItem('cartNum'));
            if(cartArr.indexOf(itemid) != -1){
                var oldNum = JSON.parse(local.getItem('cartNum')),
                index = null,newNum = [],
                i = 0,NUM_LENGTH = oldNum.length;

                for(i;i<NUM_LENGTH;i++){
                    if(itemid = oldNum[i]){
                        index = i;
                    }
                }
                oldNum[index] += num;
                local.setItem('cartNum',JSON.stringify(oldNum));
            }else{
                cartArr.push(itemid);
                cartNum.push(num);
                local.setItem('cartId',JSON.stringify(cartArr));
                local.setItem('cartNum',JSON.stringify(cartNum));
            }

        }
            this.setState({
                show:!_this.state.show
            })
    }

  componentDidMount(){
      itemid = this.props.params.name.split("&")[0];
      itemName = this.props.params.name.split("&")[1];
      var _this = this;
      var imgList = [];

      $.ajax({type:'get',async:false,url:https.api.mall}).done(res => {
          shopItem = res;
      });

      shopItem.map((res,index) => {
          if(itemid == res.itemid){
              if(res.thumb != ""){
                  imgList.push(res.thumb)
              }
              if(!res.thumb1){
                  imgList.push('./src/images/none.png')
              }
              if(!res.thumb2){
                  imgList.push('./src/images/none.png')
              }
              _this.setState({
                  item:res
              })
          }
      })
      this.setState({
          data:imgList,
      })
  }

  render() {
    return (
        <div><QueueAnim style={{overflow:'hidden'}} className="demo-content" type={['right', 'left']}>
       <div className="demo-thead" key="a">
           <NavBar className="nav-top" leftContent={<Icon type = "left" size = "lg" />} iconName={false} style={{
               backgroundColor: "#F29926",
               color: '#fff'
           }} mode="light" onLeftClick={this.back}>
               加入购物车
           </NavBar>
           <div className="content">
               <h2 className="car-h2">提交订单</h2>
               <div className="con-center">
                   <h3>{itemName}-出售商品</h3>
                   <dl>
                       <dt>
                           <a href="javascript:;">
                               <img src={this.state.data[0]} style={{border:"1px solid #ccc"}}/>
                           </a></dt>
                       <dd>
                           <p>{this.state.item.title}</p>
                           <p><span>￥{this.state.item.price}</span>        x{this.state.number}
                           </p>
                       </dd>
                   </dl>
               </div>
               <div className="con-down">
                   <p className="order-num">
                       <span>购买数量</span>
                       <div className="order-choo">
                           <a href="javascript:;" onClick={this.del}>-</a>
                           <input type="text" value={this.state.number} style={{fontSize:'0.6rem'}}/>
                           <a href="javascript:;" onClick={this.add}>+</a>
                       </div>
                   </p>
                   <p className="order-num">
                       <span>快递</span>
                       <div className="order-choo">
                           <span className="concat">联系卖家</span>
                       </div>
                   </p>
                   <p className="order-num">
                       <span>运费</span>
                       <div className="order-choo">
                           <span className="freight">￥1000.00</span>
                       </div>
                   </p>
                   <p className="order-num">
                       <div className="order-choo" style={{fontSize:'0.6rem'}}>
                           合计:<span className="freight">￥{this.state.number !=0?this.state.item.price*this.state.number + 1000:0}</span>
                       </div>
                   </p>
               </div>
           </div>
           <div className="order-footer">
               <Flex justify="center" align='center' style={{textAlign:'center'}}>
                   <Flex.Item style={{backgroundColor:'#F99013'}} onClick={this.back}>取消</Flex.Item>
                   <Flex.Item style={{backgroundColor:'#F96506'}} onClick={this.buy}>确定</Flex.Item>
               </Flex>
           </div>
       </div>
   </QueueAnim>

   <QueueAnim className="demo-content">
          {this.state.show ? [
            <div className="demo-thead" key="a">
                <NavBar className="nav-top" leftContent={<Icon type = "left" size = "lg" />} iconName={false} style={{
                    backgroundColor: "#F29926",
                    color: '#fff'
                }} mode="light" onLeftClick={this.back}>
                    加入购物车
                </NavBar>
                <div className="content">
                    <h2 className="car-h2">提交订单</h2>
                    <div className="car-enter">
                        <img src="./src/images/enter.png"/>
                        <span>商品已成功加入购物车！</span>
                    </div>
                </div>
                <div className="order-footer">
                    <div className="cart-foot">
                        <Link to={`cartlist`} className="cart-btn" style={{backgroundColor:'#F99013'}}>去结算</Link>
                        <a style={{backgroundColor:'#F96506'}} onClick={this.back}>继续购物</a>
                    </div>
                </div>
            </div>
          ] : null}
    </QueueAnim>
</div>
    );
  }
}
