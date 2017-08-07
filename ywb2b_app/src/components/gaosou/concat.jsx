import {Popover, List, NavBar, Icon, Tabs} from 'antd-mobile';
import FootComponent from './../public/Foot';
import $ from "jquery";
import QueueAnim from 'rc-queue-anim';
import * as https from './../../apis/api.jsx';

const ListItem = List.Item;
const Brief = ListItem.Brief;
const Item = Popover.Item;
const TabPane = Tabs.TabPane;

var seller = null,
    goodResult = null,
    rate = null,
    rate2 = null,
    comList = [],
    xinyu = null,
    xinList = [],
    com = null;

export default class ConcatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }


    click = () => {
        window.history.back();
    };


    componentWillMount() {
        comList = [];
        xinList = [];
        var _this = this;
        // 能力等级评分 concatGrade
        $.ajax({type: 'get', async: false, url: https.api.concatGrade}).done(function(res) {
            seller = JSON.parse(res);
        })

        // 能力等级评论 concatAbility
        $.ajax({type: 'get', async: false, url: https.api.concatAbility}).done(function(res) {
            com = res;
        })
        // 信誉等级评论 concatCredit
        $.ajax({type: 'get', async: false, url: https.api.concatCredit}).done(function(res) {
            xinyu = res;
        })
        var sellerResult = [];

        // 能力等级评分
        seller.map(function(res, index) {
            if (_this.props.params.name == res[0]) {
                goodResult = res;
                sellerResult.push(res[1], res[2], res[3]);
                _this.setState({
                    seller: sellerResult.map((res, index) => {
                        const STAR_WIDTH = res.avg + 'rem';
                        return <p  className="con-down-p" style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>{res.aid_name}：<span className="span-red">{res.avg}分</span>
                            <span className="span-star" style={{
                                width: STAR_WIDTH
                            }}><img className="sp-star" src="./src/images/star.png"/></span>
                        </p>
                    })
                })
            }
        });

        // 能力等级评论
        com.map(function(res, index) {
            if (_this.props.params.name == res.by_username) {
                comList.push(res);
                _this.setState({
                    coms:comList.map(function(res,index){
                        return <div className="con-list">
                            <p style={{
                                padding: '0.4rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin:0
                            }}>
                                <span style={{
                                    flex: 1,
                                    fontSize:'0.6rem'
                                }}>评价人</span>
                                <span style={{
                                    flex: 3,
                                    fontSize:'0.6rem'
                                }}>评价内容</span>
                            </p>
                            <p style={{
                                padding: '0.4rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin:0
                            }}>
                                <span style={{
                                    flex: 1,
                                    fontSize:'0.6rem'
                                }}>{res.username}</span>
                                <span style={{
                                    flex: 3,
                                    fontSize:'0.6rem'
                                }}>{res.mark_content}</span>
                            </p>

                        </div>
                    })
                })
            }
        });
        // 信誉等级评论
        xinyu.map(function(res, index) {
            if (_this.props.params.name == res.username) {
                xinList.push(res);
                _this.setState({
                    starList: xinList.map((res, index) => {
                        const SPAN_WIDTH_1 = res.one_star + 'rem';
                        const SPAN_WIDTH_2 = res.two_star + 'rem';
                        return <dl className="abi-dl">
                                <dt style={{
                                    width: '3.6rem',
                                    height: '6rem'
                                }}><img src={res.avatarpic}/>
                                    <span>{res.by_username}</span>
                                </dt>
                                <dd style={{
                                    width: '9.6rem',
                                    height: '6rem',
                                    padding:0,
                                    float:'left'
                                }}>
                                    <p className="dd-p">
                                        <span className="task-span">任务</span>{res.task_title}<img className="img-flo" src="./src/images/flower.png"/></p>
                                    <p className="dd-p">{res.mark_time}</p>
                                    <p className="dd-p">{res.mark_content}</p>
                                    <p className="dd-p">付款及时性<span className="span-red">{res.one_star}分</span>
                                        <span className="span-star" style={{
                                            width: SPAN_WIDTH_1
                                        }}><img className="sp-star" src="./src/images/star.png"/></span>
                                    </p>
                                    <p className="dd-p">合作愉快度<span className="span-red">{res.two_star}分</span>
                                        <span className="span-star" style={{
                                            width: SPAN_WIDTH_2
                                        }}><img className="sp-star" src="./src/images/star.png"/></span>
                                    </p>
                                </dd>
                            </dl>
                    })
                })
            }
        });


    }

    render() {
        rate = goodResult[10].grade_rate + '%';
        rate2 = goodResult[4].grade_rate + '%';
        return (
            <QueueAnim style={{
                overflow: 'hidden'
            }} className="demo-content" type={['right', 'left']}>
                <div className="demo-thead" key="a">
                    <NavBar className="nav-top" leftContent={< Icon type = "left" size = "lg" />} onLeftClick={this.click.bind(this)} iconName={false} style={{
                        backgroundColor: "#F29926",
                        color: '#fff'
                    }} mode="light">
                        {this.props.params.name}
                    </NavBar>
                    <div className="content">
                        <div className="user-concat">
                            <h2>交易评价</h2>
                            <Tabs defaultActiveKey="1" animated={false}>
                                <TabPane tab="能力等级" key="1" style={{
                                    overflow: 'hidden'
                                }}>
                                    <div className="ability">
                                        <p><img src={goodResult[10].pic2}/></p>
                                        <p>等级：{goodResult[10].level},升到下一级还需<span>{goodResult[10].level_up}</span>能力值</p>
                                        <p>
                                            <p>
                                                <span style={{
                                                    width: rate
                                                }}></span>
                                            </p>
                                        </p>
                                    </div>
                                    <div className="abi-con">
                                        <table>
                                            <tr>
                                                <td>
                                                    <span>{goodResult[5]}</span>
                                                    <p>好评率</p>
                                                </td>
                                                <td>
                                                    <span>{goodResult[6]}</span>
                                                    <p>能力值</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>{goodResult[7]}</span>
                                                    <p>中标稿件数</p>
                                                </td>
                                                <td>
                                                    <span>{goodResult[8]}</span>
                                                    <p>出售商品数</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>￥{goodResult[20]}元</span>
                                                    <p>获得任务款</p>
                                                </td>
                                                <td>
                                                    <span>￥{goodResult[9]}元</span>
                                                    <p>获得服务款</p>
                                                </td>
                                            </tr>
                                        </table>
                                        {this.state.seller}
                                    </div>
                                        {this.state.coms||<div className="con-list" style={{textAlign:'center'}}>暂无</div>}
                                </TabPane>
                                <TabPane tab="信誉等级" key="2" style={{
                                    overflow: 'hidden'
                                }}>
                                    <div className="ability">
                                        <p><img src={goodResult[4].pic2}/></p>
                                        <p>等级：{goodResult[4].level},升到下一级还需<span>{goodResult[4].level_up}</span>能力值</p>
                                        <p>
                                            <p>
                                                <span style={{
                                                    width: rate2
                                                }}></span>
                                            </p>
                                        </p>
                                    </div>
                                    <div className="abi-con">
                                        <table>
                                            <tr>
                                                <td>
                                                    <span>{goodResult[11]}</span>
                                                    <p>好评率</p>
                                                </td>
                                                <td>
                                                    <span>{goodResult[13]}</span>
                                                    <p>信誉值</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>{goodResult[12]}</span>
                                                    <p>发布任务数</p>
                                                </td>
                                                <td>
                                                    <span>{goodResult[14]}</span>
                                                    <p>购买商品数</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>￥{goodResult[15]}元</span>
                                                    <p>支付任务款</p>
                                                </td>
                                                <td>
                                                    <span>￥{goodResult[16]}元</span>
                                                    <p>支付服务款</p>
                                                </td>
                                            </tr>
                                        </table>
                                        <p className="con-down-p">{goodResult[18].aid_name}
                                            <span className="span-red">{goodResult[18].avg}分</span>
                                        </p>
                                        <p className="con-down-p">{goodResult[19].aid_name}
                                            <span className="span-red">{goodResult[19].avg}分</span>
                                        </p>
                                    </div>
                                    <div style={{
                                        margin: '0 0.6rem'
                                    }}>
                                        <p style={{
                                            border: '1px solid #ccc',
                                            padding: '0.4rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop:0
                                        }}>
                                            <span style={{
                                                flex: 1,
                                                fontSize:'0.6rem'
                                            }}>评价人</span>
                                            <span style={{
                                                flex: 3,
                                                fontSize:'0.6rem'
                                            }}>评价内容</span>
                                        </p>
                                        {this.state.starList || '暂无'}
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                    <FootComponent/>
                </div>
            </QueueAnim>
        );
    }
}
