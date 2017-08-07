import React, {PropTypes} from 'react';
import {Popover, List, NavBar, Icon, Tabs} from 'antd-mobile';
import {Link} from 'react-router';
import FootComponent from './../public/Foot';
import $ from "jquery";
import "./../../styles/users.less";
import QueueAnim from 'rc-queue-anim';
import * as https from './../../apis/api.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const ListItem = List.Item;
const Brief = ListItem.Brief;
const Item = Popover.Item;
const TabPane = Tabs.TabPane;
const storage = window.localStorage;

var data = null, scoreJson = null, liveItem = null, skillItem = null, shopItem = null, livephoto = null, rank = null, honor = null, honorResult = [], seller = null, goodResult = null, rate = null, rate2 = null, concatResult = null, concat = null, com = null, comList = null,xinyu = null, xinList = [],src10 = null,src4 = null, indexArr = [];

export default class ItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selected: '',
            show:false,
            show2:false,
            info:'',
            listArr:[],
            shopItems:'',
            concat:""
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.close = this.close.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.click = this.click.bind(this);
        this.back = this.back.bind(this);
    }

    close = (href) =>{
        var sTop = $('.content').scrollTop();
        var bTop = storage.getItem('top');
        if (bTop) {
            storage.removeItem('top');
            storage.setItem('top',sTop);
            this.context.router.push(href);
        } else {
            storage.setItem('top',sTop);
            this.context.router.push(href);
        }
        this.setState({
            show2:!this.state.show2,
        })
    }

    onSelect = (opt) => {
        this.setState({visible: false, selected: opt.props.value});
        console.log(opt);
    };

    componentDidMount = () => {
        var scoreResult = null;
        var skillResult = null;
        var liveResult = [];
        var shopList = [];
        var catename = [];
        var rankResult = [];
        var sellerResult = [];
        var starResult = [];
        var result = null;
        var _this = this;
        var dataResult = null;
        $.ajax({type:'get',url:https.api.readAll}).done(function(res){
            data = res;
            data.map(function(res,index){
                if(_this.props.params.id == res.username){
                    dataResult = res;
                }
            });
            _this.setState({
                info:dataResult
            })
        })
        // 图片介绍
        $.ajax({type:'get',url:https.api.albumPic}).done(function(res){
            var json = res;
            indexArr = [];
            json.map(function(res,index){
                if(_this.props.params.id == res.username){
                    indexArr.push(res);
                }
            })
            _this.setState({
                imgList:indexArr.map(function(res,index){
                    return <Link to={`album/${res.itemid}&${res.username}`} key={index}><img src={res.thumb}/></Link>
                })
            })
        })


        // 头像
        $.ajax({type: 'get', async: false, url: https.api.masterTotal}).done(function(res) {
            livephoto = res;
            livephoto.map(function(res,index){
                if(_this.props.params.id == res.username){
                    _this.setState({
                        livephotos:res.avatarpic
                    })
                }
            })
        })
        // 综合评分
        $.ajax({type:'get',url:https.api.score}).done(function(res){
            scoreJson = res;
            scoreJson.map(function(res,index){
                if(_this.props.params.id == res.username){
                    scoreResult = res;
                }
            });
        })
        // 绝招
        $.ajax({type:'get',url:https.api.news}).done(function(res){
            liveItem = res;
            // 江湖经历
            liveItem.map(function(res,index){
                if(_this.props.params.id == res.username){
                    liveResult.push(res);
                }
            })
            _this.setState({
                listArr:liveResult,
                items:liveResult.map(function(res,index){
                    return <ListItem key={index}>{res.title}</ListItem>
                })
            })
        })
        // 技能
        $.ajax({type:'get',url:https.api.skill}).done(function(res){
            skillItem = res;
            // 技能
            skillItem.map(function(res,index){
                if(_this.props.params.id == res.username){
                    skillResult = res;
                }
            });
        })
        // 商品列表
        $.ajax({type:'get',async: false,url:https.api.mall}).done(function(res){
            shopItem = res;
            shopItem.map(function(res,index){
                if(_this.props.params.id == res.username){
                    if(shopList.length < 7){
                        shopList.push(res);
                    }
                }
            })
            _this.setState({
                shopItems:shopList.map((res,index) => {
                    return <img key={index} onClick={_this.goHoldTask.bind(_this,`listDetail/${_this.props.params.id}&${res.itemid}`)} src={res.thumb}/>
                })
            })
        })
        // 高手榜分类排名
        $.ajax({type:'get',url:https.api.companyCat}).done(function(res){
            rank = JSON.parse(res);
            // 高手榜分类排名
            rank.map(function(res,index){
                catename = [];
                if(_this.props.params.id == res.username){
                    res.catname.map((res,index) => {
                        catename.push(res);
                        _this.setState({
                            ranking:catename.map((res,index) => {
                                if(res != ""){
                                    return <Brief key={index}>高手榜分类({res})排名: 第<span>{rankResult[index]}</span>名</Brief>
                                }
                            })
                        })
                    })
                    res.ranking.map((res,index) => {
                        rankResult.push(res);
                    })
                }
            })
        })
        // 荣誉资质
        $.ajax({type:'get',url:https.api.honor}).done(function(res){
            honor = res;
            // 荣誉资质
            honor.map(function(res,index){
                honorResult = [];
                if(_this.props.params.id == res.username){
                    honorResult.push(res);
                    _this.setState({
                        honor:honorResult.map((res,index) => {
                            return <dl key={index}>
                                <dt><img src={res.thumb}/></dt>
                                <dd>
                                    <p>证书名称：{res.title}</p>
                                    <p>发证机构：{res.authority}</p>
                                    <p>发证日期：{res.fromtime}</p>
                                </dd>
                            </dl>
                        })
                    })
                }
            })
        })
        // 能力等级评分
        $.ajax({type:'get',url: https.api.concatGrade}).done(function(res){
            seller = JSON.parse(res);
            // 能力等级评分
            seller.map(function(res,index){
                if(_this.props.params.id == res[0]){
                    goodResult=res;
                    sellerResult.push(res[1],res[2],res[3]);
                    _this.setState({
                        seller:sellerResult.map((res,index) => {
                            const STAR_WIDTH = res.avg + 'rem';
                            return  <p key={index} style={{display: 'flex',alignItems: 'center'}}>{res.aid_name}：<span className="span-red">{res.avg}分</span><span className="span-star" style={{width:STAR_WIDTH}}><img className="sp-star" src="./src/images/star.png"/></span></p>
                        }),
                    })
                }
            });
            rate = goodResult[10].grade_rate+'%';
            rate2 = goodResult[4].grade_rate+'%';
            src10 = goodResult[10].pic2
            src4 = goodResult[4].pic2
        })
        // 雇用联系
        $.ajax({type:'get',url:https.api.contact}).done(function(res){
            concatResult = res;
            // 雇用联系
            concatResult.map(function(res,index){
                if(_this.props.params.id == res.username){
                    _this.setState({
                        concat:res
                    })
                }
            })
        })
        this.setState({
            star:scoreResult,
            skillItem:skillResult
        });

        var bTop = storage.getItem('top');
        if (bTop) {
            $('.content').animate({scrollTop:bTop},100);
            storage.removeItem('top');
        }
    }

    handleVisibleChange = (visible) => {
        this.setState({visible});
    };

    back = () =>  {
        window.history.back();
    }

    click = (href) =>{
        var sTop = $('.content').scrollTop();
        var bTop = storage.getItem('top');
        if (bTop) {
            storage.removeItem('top');
            storage.setItem('top',sTop);
            this.context.router.push(href);
        } else {
            storage.setItem('top',sTop);
            this.context.router.push(href);
        }
        this.setState({
            show:!this.state.show
        });
    }

    goHoldTask(href){
        var sTop = $('.content').scrollTop();
        var bTop = storage.getItem('top');
        if (bTop) {
            storage.removeItem('top');
            storage.setItem('top',sTop);
            this.context.router.push(href);
        } else {
            storage.setItem('top',sTop);
            this.context.router.push(href);
        }
    }

    render() {
        let offsetX = -10;
        let offsetY = -10;
        let aHref = null;
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){aHref="mqq://im/chat?chat_type=wpa&version=1&src_type=web&web_src=oicqzone.com&uin="}
        if(isiOS){aHref="mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin="}
        var starArr = this.state.star?this.state.star.aid_star.split(","):['0.00','0.00','0.00'];
       return (<div>
         <NavBar className="nav-top" leftContent={<Icon type="left" size="lg" />} iconName={false} style={{backgroundColor:"#F29926",color:'#fff'}} mode="light" onLeftClick={this.back} rightContent={
           <Popover mask
             visible={this.state.visible}
             overlay={[
               (<Item key="4" value="scan"  data-seed="logId">关注</Item>),
               (<Item key="5" value="special"  style={{ whiteSpace: 'nowrap' }}>拉黑</Item>),
             ]}
             popupAlign={{
               overflow: { adjustY: 0, adjustX: 0 },
               offset: [offsetX, 5],
               offset: [offsetY, 5],
             }}
             onVisibleChange={this.handleVisibleChange}
             onSelect={this.onSelect}>
             <div style={{
               height: '100%',
               padding: '0 0.3rem',
               marginRight: '-0.3rem',
               display: 'flex',
               alignItems: 'center',
             }}>
               <Icon type="ellipsis" size="lg" />
             </div>
           </Popover>
         }>
           {this.props.params.id}
         </NavBar>
         <div className="content">
             <div className="user-pic">
                 <h2>图片案例</h2>
                {indexArr.length?this.state.imgList:<div className="shop-more">暂无图片</div>}
             </div>
             <div className="user-info">
                 <h2>基本资料</h2>
                 <div className="info-top">
                     <img className="info-img" src={this.state.livephotos}/>
                     <div className="info-right">
                         <Brief>{this.state.info.passport}</Brief>
                         <Brief>{this.state.info.company}</Brief>
                         <Brief>高手榜总排名:第<span>{this.state.info.ranking}</span>名</Brief>
                         <Brief>最近三月收入:<span>￥{this.state.info.total_sales} &nbsp;&nbsp;&nbsp;{this.state.info.accepted_num}笔</span></Brief>
                     </div>
                 </div>
                 <div className="info-center">
                     <Brief>综合评分</Brief>
                     <Brief>工作速度:<span>{starArr[0]}分</span>工作质量:<span>{starArr[1]}分</span>工作态度:<span>{starArr[2]}分</span></Brief>
                 </div>
                 <div className="info-down">
                     <Brief>联系方式</Brief>
                     <Brief>QQ:<span>{this.state.info.qq||'暂未填写'}</span>联系电话:<span>{this.state.info.telephone||'暂未填写'}</span></Brief>
                 </div>
             </div>
             <div className="user-task">
                 <h2>高手任务</h2>
                 <List>
                  <ListItem onClick={this.goHoldTask.bind(this,`holdTask/${this.props.params.id}`)} arrow="horizontal" style={{fontSize:'0.52rem'}}>承接的任务</ListItem>
                   <ListItem arrow="horizontal" style={{fontSize:'0.52rem'}} onClick={this.goHoldTask.bind(this,`releaseTask/${this.props.params.id}`)}>发布的任务</ListItem>
                 </List>
             </div>
             <div className="user-rank">
                 <h2>高手排名</h2>
                 <Brief>他(她)的等级:<img className="rank-img" src={this.state.info.buyer_level}/></Brief>
                 <Brief>高手榜总排名:第<span>{this.state.info.ranking}</span>名</Brief>
                 {this.state.ranking}
                 <Brief>售出总数量:<span>{this.state.info.seller_total_num}</span></Brief>
                 <Brief>购买总数量:<span>{this.state.info.buyer_total_num}</span></Brief>
             </div>
              <div className="user-live">
                  <h2>江湖经历</h2>
                  <List>
                    {this.state.listArr.length == 0?<ListItem>暂未填写</ListItem>:this.state.items}
                    <div onClick={this.goHoldTask.bind(this,`live/${this.props.params.id}`)} className="live-more">更多></div>
                  </List>
              </div>
              <div className="user-skill">
                  <h2>绝招</h2>
                    <p>{this.state.skillItem?this.state.skillItem.item_value:'暂未填写'}</p>
              </div>
              <div className="user-shop">
                  <h2>出售商品</h2>
                  {this.state.shopItems}
                  {this.state.shopItems.length==0?<div className="shop-more">暂无内容</div>:<div onClick={this.goHoldTask.bind(this,`shopList/${this.props.params.id}`)} className="shop-more">更多</div>}
              </div>
              <div className="authentication">
                  <h2>获得认证</h2>
                  <p>高手头衔:<img src={src10}/>雇主头衔:<img src={src4}/></p>
              </div>
              <div className="honor">
                  <h2>荣誉资质</h2>
                  {honorResult.length?this.state.honor:<div className="write-none">暂未填写</div>}
                  <Link  className="live-more">更多></Link>
                  {/* to={`live/${this.props.params.id}`} */}
              </div>
              <div className="user-server">
                  <List>
                    <ListItem arrow="horizontal" style={{fontSize:'0.52rem'}} onClick={this.click.bind(this,`server/${this.props.params.id}`)}> 服务保障</ListItem>
                    <ListItem arrow="horizontal" style={{fontSize:'0.52rem'}} onClick={this.close.bind(this,`concat/${this.props.params.id}`)}> 交易评价</ListItem>
                  </List>
              </div>
              <div className="user-concat">
                  <h2>雇用联系</h2>
                  <Brief>公司电话：{this.state.concat.telephone||'暂未填写'}</Brief>
                  <Brief>在线状态：{this.state.concat.online == 1?'当前在线':'当前离线'} </Brief>
                  <Brief>公司名称：{this.state.concat.company||'暂未填写'}</Brief>
                  <Brief>公司地址：{this.state.concat.areaid||'暂未填写'}</Brief>
                  <Brief>所在地区：{this.state.concat.address||'暂未填写'}</Brief>
                  <Brief>公司网址：{this.state.concat.linkurl||'暂未填写'}</Brief>
                  <Brief>联系人：{this.state.concat.truename}（{this.state.concat.gender == 1?'先生':'女士'}）</Brief>
                  <Brief style={{display:'flex',alignItems:'center'}}>即时通讯：<i className="iconfont icon-iconfontmark"></i><a href={aHref+this.state.concat.qq}><img style={{width:'0.8rem',height:'0.8rem',display:'inline-block',marginLeft:'0.2rem'}} src="./src/images/qq.png"/></a></Brief>
              </div>
         </div>
         <FootComponent/>
       </div>);
    }
}
ItemComponent.contextTypes = {
    router: React.PropTypes.isRequired
}
