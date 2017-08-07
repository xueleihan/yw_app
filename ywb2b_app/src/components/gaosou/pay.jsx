import {
    List,
    Popover,
    NavBar,
    Icon,
    Card,
    Tabs,
    Carousel,
    Flex
} from 'antd-mobile';
import $ from "jquery";
import {Link} from 'react-router';
import DetailFootComponent from './../public/detailFoot';
import QueueAnim from 'rc-queue-anim';
import * as https from './../../apis/api.jsx';

var itemid = null, itemName = null;

export default class ServerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number:1,
            item:{},
            data:[1]
        }
        this.del = this.del.bind(this);
        this.add = this.add.bind(this);
        this.back = this.back.bind(this);
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

  componentDidMount(){
      itemid = this.props.params.name.split("&")[0];
      itemName = this.props.params.name.split("&")[1];
      var _this = this;
      var imgList = [];

      $.ajax({type:'get',async:false,url:https.api.mall}).done(res => {
          res.map((res,index) => {
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
          _this.setState({
              data:imgList,
          })
      });


  }

  render() {
    return (<QueueAnim style={{overflow:'hidden'}} className="demo-content" type={['right', 'left']}>
       <div className="demo-thead" key="a">
           <NavBar className="nav-top" leftContent={<Icon type = "left" size = "lg" />} iconName={false} style={{
               backgroundColor: "#F29926",
               color: '#fff'
           }} mode="light" onLeftClick={this.back}>
               确认订单
           </NavBar>
           <div className="content">
               <div className="con-up">
                   <div className="con-left"><i className="iconfont icon-weizhi"></i></div>
                   <div className="con-right">
                       <p> 收货人：张小     13601889078   </p>
                       <p>收货地址：广东省东莞市  长安新区水中路南环街61号</p>
                       <p>邮政编码：512803 </p>
                   </div>
               </div>
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
           <div className="order-footer">支付</div>
       </div>
   </QueueAnim>);
  }
}
