import React from 'react';
import {NavBar, Icon, List, Toast} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import {Link} from 'react-router';
import $ from "jquery";

const Item = List.Item;
const Brief = Item.Brief;
import * as https from './../../apis/api.jsx';
var dataList = null,
    item = null,
    id = 0,
    maybeList = null,
    indus_id = 0,
    maybeItem = [];

export default class TaskResultComponent extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
        this.toPay = this.toPay.bind(this);
    }

    click() {
        window.history.back()
    }

    toPay() {
        var that = this;
        $.ajax({
            type: 'post',
            async: false,
            url: https.api.deposit,
            data: {
                task_id: this.props.params.id,
                userid: 60,
                task_cash: item.task_cash
            }
        }).done((data) => {
            if (data.code == 200) {
                Toast.loading('正在转到支付页面', 1, () => {
                    that.context.router.push(`/taskPay&${id}`);
                });
            } else {
                Toast.loading(data.msg+'，正在跳转到充值页面', 2, () => {});
            }
        })
    }

    componentWillMount() {
        var that = this;
        id = this.props.params.id;
        indus_id = this.props.params.indus;
        maybeItem = [];
        $.ajax({
            type: 'get',
            async: false,
            url: https.api.tasklist
        }).done((data) => {
            dataList = data;
        });
        $.ajax({
            type: 'get',
            async: false,
            url: https.api.masterTotal
        }).done((data) => {
            maybeList = data;
        });
        maybeList.map((res, index) => {
            res.catid.map((el, index) => {
                if (el == indus_id) {
                    maybeItem.push(res);
                }
            })
        });

        this.setState({
            perItem: maybeItem.map((res, index) => {
                return <Link>
                    <Item arrow="empty">
                        <div className="Item-left">
                            <a href="javascript:;">
                                <img src={res.avatarpic}/>
                            </a>
                        </div>
                        <div className="Item-right">
                            <Brief style={{
                                fontSize: '0.55rem',
                                color: "#464646",
                                width: '100%'
                            }}>{res.username}<img src={res.buyer_level} className="Brief-img"/>
                                <span style={{
                                    float: 'right',
                                    paddingRight: '0.6rem'
                                }}>最近3月成交：<em>{res.total_sales}</em>
                                </span>
                            </Brief>
                            <Brief style={{
                                fontSize: '0.55rem',
                                color: "#464646",
                                width: "100%"
                            }}>好评率：<em>{res.pre}</em>
                                <span style={{
                                    float: "right",
                                    paddingRight: '0.6rem'
                                }}>{res.areaid}</span>
                            </Brief>
                            <Brief style={{
                                width: '100%',
                                fontSize: '0.55rem',
                                color: "#464646"
                            }}>主营：{res.business || '暂未填写'}</Brief>
                        </div>
                    </Item>
                </Link>
            })
        })

        dataList.map((res, index) => {
            if (res.task_id == id) {
                item = res;
            }
        });
    }

    render() {
        return (
            <QueueAnim style={{
                overflow: 'hidden'
            }} className="demo-content" type='right' id="task-result">
                <div className="demo-thead" key="a">
                    <NavBar className="nav-top" leftContent={<Icon type = "left" size = "lg" />} onLeftClick={this.click} iconName={false} style={{
                        backgroundColor: "#fff",
                        color: '#000',
                    }} mode="light">
                        任务发布
                    </NavBar>
                    <div className="task-con" style={{
                        width: '100%',
                        overflowY: 'auto'
                    }}>
                        <div className="result">
                            <Icon type="check-circle" className="icon" size='lg' style={{
                                fill: '#80C632'
                            }}/>
                            <h2>发布成功！</h2>
                            <p>请在托管赏金后，耐心的等待高手为您投标</p>
                        </div>
                        <div className="task-order">
                            <div className="task-card">
                                <p className='task-p-title'>
                                    <span>招募</span>{item.task_title}
                                </p>
                                <p style={{
                                    margin: '0.6rem'
                                }}>需求描述</p>
                                <p className="task-need-p">{item.task_desc}
                                </p>
                                <p className="task-detail-p">
                                    <i style={{
                                        float: 'left'
                                    }}>金额：<i>￥{item.task_cash}</i>
                                    </i>
                                    <i style={{
                                        float: 'right'
                                    }}>发布日期：<b>{item.start_time}</b>
                                    </i>
                                </p>
                                <p className="task-sub-p">
                                    <div className="task-pay" onClick={this.toPay}>确认并托管赏金</div>
                                    <Link to={`/taskOrder&${id}`}>
                                        <div className="task-no-pay">暂不托管赏金</div>
                                    </Link>
                                </p>
                                <p style={{
                                    margin: 0,
                                    paddingRight: '0.6rem',
                                    textAlign: 'right'
                                }}>
                                    <Link style={{
                                        color: '#464646'
                                    }} to={`/taskOrder&${id}`} className="task-check-order">查看订单</Link>
                                </p>
                            </div>
                        </div>
                        <div className="master-same">
                            <h2>承接同类需求的高手</h2>
                            {this.state.perItem}
                        </div>
                    </div>
                </div>
            </QueueAnim>
        );
    }
}

TaskResultComponent.contextTypes = {
    router: React.PropTypes.isRequired
}
