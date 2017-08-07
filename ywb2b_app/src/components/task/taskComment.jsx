import React from 'react';
import {Tabs, List} from 'antd-mobile';
import {Link} from 'react-router';
import $ from "jquery";
import TaskConcatModal from "./taskConcatModal";
import * as https from './../../apis/api.jsx';
const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;
const manus = [];   // all
const manusNotView = [];    // not view(未浏览) status == 2
const manusIn = [];     // 入围 status == 5
const manusCheck = [];      // 中标 status == 4
const manusOut = [];    // 淘汰 status == 7

export default class TaskCommentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow:false
        }
    }

    showModal(name){
        this.setState({
            isShow:!this.state.isShow,
            name:name
        })
    }

    componentDidMount(){
        var that = this;
        $.ajax({type:"get",async:false,url:https.api.SubmissionDetail}).done(function (res) {
            res.map((res, index) => {
                if (res.task_id == that.props.taskId) {
                    manus.push(res);
                    switch (res.work_status) {
                        case 2:
                            manusNotView.push(res)
                            break;
                        case 4:
                            manusCheck.push(res)
                            break;
                        case 5:
                            manusIn.push(res)
                            break;
                        case 7:
                            manusOut.push(res)
                            break;
                    }
                }
            })
        });
        // 全部
        this.setState({
            manus: manus.map((res, index) => {
                // var type = res.work_pic.substring(res.work_pic.length-3,res.work_pic.length);
                return <div className="tab-box">
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
                            }}>投稿人：{res.username}<img src={res.seller_level} className="Brief-img"/>
                            </Brief>
                            <Brief style={{
                                fontSize: '0.55rem',
                                color: "#464646",
                                width: "100%"
                            }}>进入店铺
                            </Brief>
                            <Item onClick={this.showModal.bind(this,res.username)}><Brief style={{
                                width: '100%',
                                fontSize: '0.55rem',
                                color: "#464646"
                            }}>联系我</Brief></Item>
                        </div>
                    </Item>
                    <div className="manuscript">
                        <img src={res.work_pic} style={{width:'100%',height:'100%'}}/>
                    </div>
                    <p className="manus-p">附件：{res.work_pic}</p>
                    <p className="manus-p">描述：{res.work_desc}</p>
                    <div className="tab-num-sure">
                        <span>编号：#{this.props.item.task_id}</span>
                        <span>投稿时间：{this.props.item.start_time}</span>
                        <span className="tab-span-sure">{res.is_view==1?'雇主已浏览':'雇主未浏览'}</span>
                    </div>
                </div>
            }),
            manusNotView:manusNotView.map((res, index) => {
                // var type = res.work_pic.substring(res.work_pic.length-3,res.work_pic.length);
                return <div className="tab-box">
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
                            }}>投稿人：{res.username}<img src={res.seller_level} className="Brief-img"/>
                            </Brief>
                            <Brief style={{
                                fontSize: '0.55rem',
                                color: "#464646",
                                width: "100%"
                            }}>进入店铺
                            </Brief>
                            <Item onClick={this.showModal.bind(this)}><Brief style={{
                                width: '100%',
                                fontSize: '0.55rem',
                                color: "#464646"
                            }}>联系我</Brief></Item>
                        </div>
                    </Item>
                    <div className="manuscript">
                        <img src={res.work_pic} style={{width:'100%',height:'100%'}}/>
                    </div>
                    <p className="manus-p">附件：{res.work_pic}</p>
                    <p className="manus-p">描述：{res.work_desc}</p>
                    <div className="tab-num-sure">
                        <span>编号：#{this.props.item.task_id}</span>
                        <span>投稿时间：{this.props.item.start_time}</span>
                        <span className="tab-span-sure">{res.is_view==1?'雇主已浏览':'雇主未浏览'}</span>
                    </div>
                </div>
            }),
            manusCheck:manusCheck.map((res, index) => {
                // var type = res.work_pic.substring(res.work_pic.length-3,res.work_pic.length);
                return <div className="tab-box">
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
                            }}>投稿人：{res.username}<img src={res.seller_level} className="Brief-img"/>
                            </Brief>
                            <Brief style={{
                                fontSize: '0.55rem',
                                color: "#464646",
                                width: "100%"
                            }}>进入店铺
                            </Brief>
                            <Item onClick={this.showModal.bind(this)}><Brief style={{
                                width: '100%',
                                fontSize: '0.55rem',
                                color: "#464646"
                            }}>联系我</Brief></Item>
                        </div>
                    </Item>
                    <div className="manuscript">
                        <img src={res.work_pic} style={{width:'100%',height:'100%'}}/>
                    </div>
                    <p className="manus-p">附件：{res.work_pic}</p>
                    <p className="manus-p">描述：{res.work_desc}</p>
                    <div className="tab-num-sure">
                        <span>编号：#{this.props.item.task_id}</span>
                        <span>投稿时间：{this.props.item.start_time}</span>
                        <span className="tab-span-sure">{res.is_view==1?'雇主已浏览':'雇主未浏览'}</span>
                    </div>
                </div>
            }),
            manusIn:manusIn.map((res, index) => {
                // var type = res.work_pic.substring(res.work_pic.length-3,res.work_pic.length);
                return <div className="tab-box">
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
                            }}>投稿人：{res.username}<img src={res.seller_level} className="Brief-img"/>
                            </Brief>
                            <Brief style={{
                                fontSize: '0.55rem',
                                color: "#464646",
                                width: "100%"
                            }}>进入店铺
                            </Brief>
                            <Item onClick={this.showModal.bind(this)}><Brief style={{
                                width: '100%',
                                fontSize: '0.55rem',
                                color: "#464646"
                            }}>联系我</Brief></Item>
                        </div>
                    </Item>
                    <div className="manuscript">
                        <img src={res.work_pic} style={{width:'100%',height:'100%'}}/>
                    </div>
                    <p className="manus-p">附件：{res.work_pic}</p>
                    <p className="manus-p">描述：{res.work_desc}</p>
                    <div className="tab-num-sure">
                        <span>编号：#{this.props.item.task_id}</span>
                        <span>投稿时间：{this.props.item.start_time}</span>
                        <span className="tab-span-sure">{res.is_view==1?'雇主已浏览':'雇主未浏览'}</span>
                    </div>
                </div>
            }),
            manusOut:manusOut.map((res, index) => {
                // var type = res.work_pic.substring(res.work_pic.length-3,res.work_pic.length);
                return <div className="tab-box">
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
                            }}>投稿人：{res.username}<img src={res.seller_level} className="Brief-img"/>
                            </Brief>
                            <Brief style={{
                                fontSize: '0.55rem',
                                color: "#464646",
                                width: "100%"
                            }}>进入店铺
                            </Brief>
                            <Item onClick={this.showModal.bind(this)}><Brief style={{
                                width: '100%',
                                fontSize: '0.55rem',
                                color: "#464646"
                            }}>联系我</Brief></Item>
                        </div>
                    </Item>
                    <div className="manuscript">
                        <img src={res.work_pic} style={{width:'100%',height:'100%'}}/>
                    </div>
                    <p className="manus-p">附件：{res.work_pic}</p>
                    <p className="manus-p">描述：{res.work_desc}</p>
                    <div className="tab-num-sure">
                        <span>编号：#{this.props.item.task_id}</span>
                        <span>投稿时间：{this.props.item.start_time}</span>
                        <span className="tab-span-sure">{res.is_view==1?'雇主已浏览':'雇主未浏览'}</span>
                    </div>
                </div>
            })
        });

    }

    render() {
        return (
            <Tabs defaultActiveKey="1" animated={false} swipeable={false}>
                <TabPane tab="所有" key={1}>
                    {manus.length?this.state.manus:<div className="no-manus">暂无投稿，请耐心等待。</div>}
                </TabPane>
                <TabPane tab="未浏览" key={2}>
                    {manusNotView.length?this.state.manusNotView:<div className="no-manus">暂无投稿，请耐心等待。</div>}
                </TabPane>
                <TabPane tab="中标" key={3}>
                    {manusCheck.length?this.state.manusCheck:<div className="no-manus">暂无投稿，请耐心等待。</div>}
                </TabPane>
                <TabPane tab="入围" key={4}>
                    {manusIn.length?this.state.manusIn:<div className="no-manus">暂无投稿，请耐心等待。</div>}
                </TabPane>
                <TabPane tab="淘汰" key={5}>
                    {manusOut.length?this.state.manusOut:<div className="no-manus">暂无投稿，请耐心等待。</div>}
                </TabPane>
                <TabPane tab="我的" key={6}>
                    <div className="tab-box">
                        <Item arrow="empty">
                            <div className="Item-left">
                                <a href="javascript:;">
                                    <img src='http://120.76.78.213/gaosou/api/avatar/show.php?username=compan_01&size=large'/>
                                </a>
                            </div>
                            <div className="Item-right">
                                <Brief style={{
                                    fontSize: '0.55rem',
                                    color: "#464646",
                                    width: '100%'
                                }}>投稿人：邹建伟<img src="./src/images/level_01.png" className="Brief-img"/>
                                </Brief>
                                <Brief style={{
                                    fontSize: '0.55rem',
                                    color: "#464646",
                                    width: "100%"
                                }}>进入店铺
                                </Brief>
                                <Brief style={{
                                    width: '100%',
                                    fontSize: '0.55rem',
                                    color: "#464646"
                                }}>联系我</Brief>
                            </div>
                        </Item>
                        <div className="manuscript">
                            稿件
                        </div>
                        <p>附件：xxx.png</p>
                        <p>留言：投标人（高手）的留言</p>
                        <div className="tab-num-sure">
                            <span>编号：#{this.props.item.task_id}</span>
                            <span>投稿时间：{this.props.item.start_time}</span>
                            <span className="tab-span-sure">雇主已浏览</span>
                        </div>
                    </div>
                </TabPane>
                {this.state.isShow?<TaskConcatModal name={this.state.name} showModal={this.showModal.bind(this)}/>:null}
            </Tabs>
        );
    }
}
