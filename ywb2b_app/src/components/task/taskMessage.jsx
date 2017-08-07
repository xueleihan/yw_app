import React from 'react';
import {List, TextareaItem, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import {Link} from 'react-router';
import $ from "jquery";
import QueueAnim from 'rc-queue-anim';
import * as https from './../../apis/api.jsx';

const Item = List.Item;
const Brief = Item.Brief;
var comList = [];
const STORAGE = window.localStorage;
const user = STORAGE.getItem('username');
const userid = STORAGE.getItem('uid');
const date = new Date().toLocaleString();
export default class TaskMessageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWarn: false,
            editable: true,
            length: 0,
            showed: false,
            userinfo:{}
        }
        this.submitDeal = this.submitDeal.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.countText = this.countText.bind(this);
    }
    submitDeal() {
        this.setState({showWarn: false, editable: true, showed: true})
    }

    sendComment(){
        var that = this;
        $.ajax({type:'post',url:https.api.SendComment,data:{
            username:user,
            uid:userid,
            item_id:that.props.taskId,
            content:that.state.tValue
        }}).done((res) => {
            if (res.code == 200) {
                Toast.loading('正在发表...', 1, () => {
                    that.setState({
                        tValue: ''
                    })
                    that.setState({comList:[]})
                    setTimeout(that.getData(),1000);
                });
            }
        })
    }

    countText(e) {
        if (this.state.showed == true) {
            this.setState({showWarn: false})
            if (e.length < 100) {
                this.setState({showed: false});
            }
        } else {
            if (e.length > 100) {
                this.setState({showWarn: true, editable: false});
            }
        }
        this.setState({
            tValue:e
        })
    }
    getData () {
        var that = this;
        comList = [];
        $.ajax({type:'get',async:false,url:https.api.HistoryComment}).done((data) => {
            data.map((res, index) => {
                if (res.item_id == that.props.taskId) {
                    comList.push(res);
                }
            })
        });
        this.setState({
            comList:comList.map((res, index) => {
                return <div className="task-common">
                    <dl>
                        <dt>
                            <img src={res.avatarpic}/>
                        </dt>
                        <dd>
                            <p>{res.username}</p>
                            <p>{res.addtime}</p>
                            <p>{res.content}</p>
                        </dd>
                    </dl>
                </div>
            })
        })
    }
    componentDidMount(){
        var that = this;
        comList = [];
        this.getData();
        $.get(https.api.master,(data) =>{
            data.map(function(res, index){
                if (res.username == user) {
                    that.setState({userinfo:res})
                }
            })
        })
    }

    render() {
        return (
            <div className="tab-box" style={{
                marginBottom: '1rem',
                fontSize:'0.6rem'
            }}>
                {user?<div><Item arrow="empty">
                    <div className="Item-left">
                        <a href="javascript:;">
                            <img src={this.state.userinfo.avatarpic} />
                        </a>
                    </div>
                    <div className="Item-right">
                        <Brief style={{
                            fontSize: '0.55rem',
                            color: "#464646",
                            width: '100%'
                        }}>{user}
                        </Brief>
                        <Brief style={{
                            fontSize: '0.55rem',
                            color: "#464646",
                            width: "100%"
                        }}>{date}
                        </Brief>
                    </div>
                </Item>
                <div className="tab-mess">
                    <TextareaItem rows={9} value={this.state.tValue} editable={this.state.editable} onChange={this.countText}/>
                </div>
                <div className="tab-send">
                    <p>留言不得超过100字</p>
                    <div className="tab-btn-send" onClick={this.sendComment}>发表</div>
                </div>
                {this.state.comList}</div>:'您暂未登录，无法留言。'}
                {this.state.showWarn
                    ? <QueueAnim className="task-modal-out" type="scaleY">
                            <div className="am-popover-mask"></div>
                            <div className="demo-thead task-title-replace" key="a">
                                <div className="task-modal" style={{
                                    overflow: 'hidden'
                                }}>
                                    <h2>警告</h2>
                                    <div className="info-box">
                                        <div>
                                            <h2>提示:</h2>
                                            <p>
                                                1.您只能输入100字以内的留言
                                            </p>
                                            <p>
                                                2.请重新输入
                                            </p>
                                        </div>
                                    </div>
                                    <div className="button-box">
                                        <div className="btn-sure" onClick={this.submitDeal}>确认</div>
                                    </div>
                                </div>
                            </div>
                        </QueueAnim>
                    : null}
            </div>
        );
    }
}

TaskMessageComponent.contextTypes = {
    router: React.PropTypes.isRequired
}
