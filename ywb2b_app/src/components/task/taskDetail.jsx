import React from 'react';
import {NavBar, Icon, Tabs} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import {Link} from 'react-router';
import $ from "jquery";
import './../../styles/taskOrder.less';
import TaskCommentComponent from './taskComment';
import TaskMessageComponent from './taskMessage';
import * as https from './../../apis/api.jsx';

var data = null;
var item = null;
var status = '';
const TabPane = Tabs.TabPane;
var taskId = 0;

// const [data,item,status,TabPane,taskId] = [null, null, '', Tabs.TabPane, 0];

export default class TaskDetail extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        window.history.back()
    }

    componentWillMount() {
        // 根据路由传递的数据找到对应的任务
        taskId = this.props.params.id;
        $.ajax({type: 'get', async: false, url: https.api.tasklist}).done(function(res) {
            data = res;
        });
        data.map((res, index) => {
            if (res.task_id == taskId) {
                item = res;
            }
        });
    }

    render() {
        // 判断任务的状态
        if (item.task_status === 0) {
            status = '未付款'
        } else if (item.task_status === 1) {
            status = '待审核'
        } else if (item.task_status === 2) {
            status = '投稿中'
        } else if (item.task_status === 3) {
            status = '选稿中'
        } else if (item.task_status === 4) {
            status = '投票中'
        } else if (item.task_status === 5) {
            status = '公示中'
        } else if (item.task_status === 6) {
            status = '交付中'
        } else if (item.task_status === 7) {
            status = '冻结中'
        } else if (item.task_status === 8) {
            status = '结束'
        } else if (item.task_status === 9) {
            status = '失败'
        } else if (item.task_status === 10) {
            status = '审核失败'
        } else if (item.task_status === 11) {
            status = '仲裁中'
        } else if (item.task_status === 'p2') {
            status = '投标中'
        } else if (item.task_status === 'd2') {
            status = '竞标中'
        } else if (item.task_status === 13) {
            status = '交付冻结'
        }
        return (
            <QueueAnim style={{
                overflow: 'hidden'
            }} className="demo-content" type='right'>
                <div className="demo-thead" key="a" id='task-head'>
                    <NavBar className="nav-top" leftContent={<Icon type = "left" size = "lg" />} onLeftClick={this.click.bind(this)} iconName={false} style={{
                        backgroundColor: "#fff",
                        color: '#000'
                    }} mode="light">
                        订单详情
                    </NavBar>
                    <div className="task-con" style={{
                        width: '100%',
                        overflow: 'auto'
                    }}>
                        <div className="task-order-detail">
                            <p className='task-p-title'>
                                <div>
                                    <span >招募</span>
                                    <h2>{item.task_title}</h2>
                                </div>
                                <i>订单号:#{item.task_id}</i>
                            </p>
                            <p className='task-detail-p'>
                                <span>金额:<i>￥{item.task_cash}</i>
                                </span>
                                <span>交易模式:<b>{item.model_id == 1
                                            ? '单人悬赏'
                                            : '多人悬赏'}</b>
                                </span>
                                <span>状态:<b>{status}</b>
                                </span>
                            </p>
                            <p className='task-area-p'>
                                <span>地点：{item.area}
                                </span>
                                <span style={{
                                    float: 'right'
                                }}>发布日期：{item.start_time}
                                </span>
                            </p>
                        </div>
                        <div className="task-need">
                            <h3>需求描述:</h3>
                            <div className="task-need-con-all">
                                <div>{item.task_desc}</div>
                            </div>
                        </div>
                        <div className='task-manuscript'>
                            <h3>高手投标的稿件</h3>
                            <Tabs defaultActiveKey="1" animated={false} swipeable={false}>
                                <TabPane tab="稿件数" key="1" className="tab-bar-father">
                                    <TaskCommentComponent item={item} taskId={taskId}/>
                                </TabPane>
                                <TabPane tab="留言" key="2">
                                        <TaskMessageComponent item={item} taskId={taskId}/>
                                </TabPane>
                                <TabPane tab="评价" key="3">
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'0.6rem','height':'5rem'}}>
                                        暂无评论
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </QueueAnim>
        );
    }
}
