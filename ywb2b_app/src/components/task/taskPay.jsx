import React from 'react';
import {NavBar, Icon, Tabs} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import $ from "jquery";
import './../../styles/taskOrder.less';
import * as https from './../../apis/api.jsx';
var userItem = null,
    userInfo = null,
    moneyInfo = null,
    item = null,
    task_cash = 0,
    remain = 0,
    result = 0;

export default class taskPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            mValue:'',
            userInfo:{}
        }
        this.click = this.click.bind(this);
        this.pay = this.pay.bind(this);
    }

    // back button event.
    click() {
        window.history.back()
    }

    componentDidMount(){
        var that = this;
        // Get the task information and tell the user how much it will cost.
        $.ajax({type:'get', async:false, url: https.api.tasklist}).done((data) => {
            data.map((res, index) => {
                if (res.task_id == that.props.params.id) {
                    userItem = res.username;
                    item = res;
                }
            })
        })
        // use the router params to get user info
        $.ajax({type:'get', async:false, url: https.api.masterTotal}).done((data) => {
            data.map((res, index) => {
                if (res.username == userItem) {
                    that.setState({userInfo: res})
                }
            })
        })
        // Check if the user has enough money to pay
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
                remain = data.remain;
                result = data.result;
                task_cash = data.task_cash;
            }
        });
        // if keyborad is awakeed then footer Component will be hide.
        window.addEventListener('resize', function() {
            document.body.clientHeight <= 400
                ? that.setState({show: false})
                : that.setState({show: true});
        }, false);
    }

    pay(){
        var that = this;
        if (this.state.mValue == '') {
            alert('请输入支付密码！')
        } else {
            // Use the station balance to initiate payment requests.
            $.ajax({type:'post',async:'false',url: https.api.taskpay,data:{
                userid:'60',
                task_id:item.task_id,
                task_cash: item.task_cash,
                payword:that.state.mValue
            }}).done((data) => {
                if (data.code == 500) {
                    alert(data.msg);
                    this.setState({
                        mValue:''
                    })
                } else {
                    if (data.msg == '支付失败') {
                        alert('支付失败，请不要重复支付！')
                    }else {
                        this.context.router.push(`/taskPayResult&${this.props.params.id}`);
                    }
                }
            })
        }

    }

    render() {
        return (
            <QueueAnim style={{
                overflow: 'hidden'
            }} className="demo-content" type='right'>
                <div className="demo-thead" key="a" id='task-pay-head'>
                    <NavBar className="nav-top" leftContent={<Icon type = "left" size = "lg" />} onLeftClick={this.click} iconName={false} style={{
                        backgroundColor: "#F29926",
                        color: '#fff'
                    }} mode="light">
                        余额支付
                    </NavBar>
                    <div className="task-pay-content">
                        <h2>使用余额支付</h2>
                        <div className="task-pay-info">
                            <img src={this.state.userInfo.avatarpic} alt=""/>
                            <p>{this.state.userInfo.username}</p>
                            <p>{this.state.userInfo.business}</p>
                        </div>
                        <div className="task-pay-pwd">
                            <span>支付密码：</span>
                            <input type="password" value={this.state.mValue} onChange={(e) => {
                                this.setState({mValue: e.target.value});
                            }}/>
                        </div>
                        <div className="task-pay-money">
                            <p>您的账户还剩：<span>{result}元</span></p>
                            <p>本次将支付托管金额：<span>{task_cash}元</span></p>
                            <p>支付后余额将剩余<span>{remain}元</span></p>
                        </div>
                    </div>
                    {this.state.show
                        ? <div className="task-pay-footer" onClick={this.pay}>
                            ￥{task_cash} 确认支付
                        </div>
                        : null}
                </div>
            </QueueAnim>
        );
    }
}

// register the router to use these params like this.push().
taskPay.contextTypes = {
    router: React.PropTypes.isRequired
}
