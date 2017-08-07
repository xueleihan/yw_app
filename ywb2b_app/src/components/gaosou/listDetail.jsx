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

const Item = List.Item;
const Brief = Item.Brief;
const TabPane = Tabs.TabPane;
var itemid = null;
var shopItem = null;
var itemName = null;
var shopList = null;
var itemArr = [];
var imgsrc = null;
var shopdetailItem = null;
var starText = null;
var orderList = null;

export default class Albumsort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: [
                '', '', ''
            ],
            initialHeight: 200,
            show:false,
            number:1,
            item:{}
        }
        this.onClick = this.onClick.bind(this);
        this.back = this.back.bind(this);
    }
    back = () => {
        window.history.back();
    }
    onClick = () => {
        this.setState({
          show: !this.state.show
        })
    }

    componentDidMount = () => {
        itemid = this.props.params.name.split("&")[1];
        itemName = this.props.params.name.split("&")[0];
        var _this = this;
        var imgList = [];
        $.ajax({type:'get',url:https.api.mall}).done(res => {
            shopItem = res;
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
            });

            _this.setState({
                data:imgList,
            })
        })
        $.ajax({type:'get',url:https.api.malldetail}).done(res => {
            // 评论详情
            res.map((res,index) => {
                switch (res.seller_star) {
                    case 1:
                        imgsrc = "./src/images/star1.gif";
                        starText = '差评'
                        break;
                    case 2:
                        imgsrc = "./src/images/star2.gif"
                        starText = '中评'
                        break;
                    case 3:
                        imgsrc = "./src/images/star3.gif"
                        starText = '好评'
                        break;
                }
                if(itemid == res.mallid){
                    if(res.seller_ctime!=0){itemArr.push(res)
                    _this.setState({
                        shopItems:itemArr.map((res,index) => {
                            return <div className="shopItem-center">
                                <p><span style={{marginLeft:'0.6rem',color:'#526286'}}>买家：{res.buyer}</span><span style={{float:'right',marginRight:'0.4rem'}}>{res.seller_ctime}</span></p>
                                <p> <span style={{paddingLeft:'0.6rem'}}>{starText}</span> <img src={imgsrc}/></p>
                                <p><span style={{paddingLeft:'0.6rem'}}>{res.seller_comment}</span></p>
                            </div>
                        })
                    })}
                }
            })

        })
        $.ajax({type:'get',url:https.api.mallorder}).done(res => {
            orderList = res;
            // 交易记录
            orderList.map((res,index) => {
                if(itemid == res.mallid){
                    _this.setState({
                        orderItem:<Flex key={itemid} style={{textAlign:'center',fontSize:'0.3rem',padding:"0.2rem"}}>
                            <Flex.Item>{res.buyer}</Flex.Item>
                            <Flex.Item style={{color:'red'}}>￥{res.price}</Flex.Item>
                            <Flex.Item>{res.price}</Flex.Item>
                            <Flex.Item>{res.updatetime}</Flex.Item>
                            <Flex.Item style={{color:'red'}}>完成</Flex.Item>
                        </Flex>
                    })
                }
            })
        })
        $.ajax({type:'get',url:https.api.xiangqing}).done(res => {
            shopList = res;
            // 商品详情
            shopList.map((res,index) => {
                if(itemid == res.itemid){
                    shopdetailItem = res;
                }
            })
        })
    }

    render() {
        return (
            <div>
                <NavBar className="nav-top" leftContent={<Icon type = "left" size = "lg" />} iconName={false} style={{
                    backgroundColor: "#F29926",
                    color: '#fff'
                }} mode="light" onLeftClick={this.back}>
                    {itemName}
                </NavBar>
                <div className="content">
                    <h2 className="hold-h2">出售商品</h2>
                    <Carousel className="my-carousel" infinite selectedIndex={0} autoplay={false} style={{height:"11.25rem",padding:'0.6rem 0.6rem 0 0.6rem'}}>
                        {this.state.data.map((res,index) => (
                            <a href="javascript:;" key={index}>
                                <img src={res} style={{height:"10.65rem",width:'100%'}}/>
                            </a>
                        ))}
                    </Carousel>
                    <div className="item-info">
                        <p>{this.state.item.title}</p>
                        <p>单价：<span>{this.state.item.price}</span>
                        </p>
                        <p>品牌：{this.state.item.brand||'未填写'}</p>
                        <p>销量：累计出售{this.state.item.sales}件</p>
                        <p>地区：{this.state.item.address||'暂未填写'}</p>
                    </div>
                    <Tabs defaultActiveKey="1" animated={false}>
                        <TabPane tab="商品详情" key="1">
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '1rem',
                                backgroundColor: '#fff',
                                textAlign:'justify',
                                fontSize:'0.5rem',
                                overflow:'auto',
                                padding:'0.6rem'
                            }}>
                            {shopdetailItem?shopdetailItem.content:'暂未填写'}
                            </div>
                        </TabPane>
                        <TabPane tab="评价详情" key="2">
                            <div style={{paddingBottom:'0.6rem'}}>
                                {itemArr.length?this.state.shopItems:<div style={{display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            height:'1rem',
                            fontSize:'0.5rem',
                        padding:'0.6rem'}}>暂无</div>}
                            </div>
                        </TabPane>
                        <TabPane tab="交易记录" key="3">
                            <div>
                                {this.state.orderItem?<Flex style={{textAlign:'center',fontSize:'0.6rem',padding:"0.2rem",borderBottom:'1px solid #ccc'}}>
                                    <Flex.Item>买家</Flex.Item>
                                    <Flex.Item>出价</Flex.Item>
                                    <Flex.Item>购买数量</Flex.Item>
                                    <Flex.Item>成交时间</Flex.Item>
                                    <Flex.Item>状态</Flex.Item>
                                </Flex>:null}
                                {this.state.orderItem||<div style={{display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            height:'1rem',
                            fontSize:'0.5rem',
                        padding:'0.6rem'}}>暂无</div>}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                <DetailFootComponent click={this.onClick} itemName={itemName} itemid={itemid} show={this.state.show}/>
            </div>
        );
    }

}
