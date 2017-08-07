import React from 'react';
import {NavBar, Icon, Tabs} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import {Link} from 'react-router';
import $ from "jquery";
import './../../styles/taskOrder.less';
import TaskModal from './taskModal';
import DemandModal from './demandModal';
import CloseDeal from './closeDeal';
import * as https from './../../apis/api.jsx';

var onOff = true;
const TabPane = Tabs.TabPane;
var dataList = null,
    item = null,
    id = 0,
    type = '';

export default class TaskOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            class: 'task-need-con',
            arrow: 'ˇ',
            onOff: false,
            show: false,
            sure: false
        }
        this.click = this.click.bind(this);
        this.showTitleReplace = this.showTitleReplace.bind(this);
        this.showDemandReplace = this.showDemandReplace.bind(this);
        this.showDealReplace = this.showDealReplace.bind(this);
        this.slide = this.slide.bind(this);
    }

    click() {
        window.history.back()
    }

    showTitleReplace() {
        this.setState({
            onOff: !this.state.onOff
        })
    }
    showDemandReplace() {
        this.setState({
            show: !this.state.show
        })
    }
    showDealReplace() {
        this.setState({
            sure: !this.state.sure
        })
    }

    slide() {
        if (onOff) {
            this.setState({class: 'task-need-con-high', arrow: 'ˇ'});
        } else {
            this.setState({class: 'task-need-con', arrow: 'ˇ'});
        }
        onOff = !onOff;
    }

    componentWillMount() {
        id = this.props.params.id;
        $.ajax({
            type: 'get',
            async: false,
            url: https.api.tasklist
        }).done((data) => {
            dataList = data;
        });

        dataList.map((res, index) => {
            if (res.task_id == id) {
                item = res;
            }
        });
    }

    render() {
        switch (item.model_id) {
            case '1':
                type = '单人悬赏'
                break;
            case '2':
                type = '多人悬赏'
                break;
            case '3':
                type = '计件悬赏'
                break;
            case '4':
                type = '普通招标'
                break;
            case '5':
                type = '订金招标'
                break;
            case '6':
                type = '速配任务'
                break;
            default:

        }
        return (
            <QueueAnim style={{
                overflow: 'hidden'
            }} className="demo-content" type='right' id="task-result">
                <div className="demo-thead" key="a">
                    <NavBar className="nav-top" leftContent={<Icon type = "left" size = "lg" />} onLeftClick={this.click} iconName={false} style={{
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
                                <p style={{margin:0}}>
                                    <span>招募</span>
                                    <h2 className="task-title-p-h2">{item.task_title}</h2>
                                </p>
                                <h3>订单号:#{item.task_id}</h3>
                            </p>
                            <p className='task-detail-p'>
                                <span>金额:<b>￥{item.task_cash}</b>
                                </span>
                                <span>交易模式:<b>{type}</b>
                                </span>
                                <span>赏金:<b>已托管</b>
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
                            <h3>需求描述</h3>
                            <div className={this.state.class}>
                                <div>{item.task_desc}</div>
                                <span onClick={this.slide}>{this.state.arrow}</span>
                            </div>
                        </div>
                        <div className="task-handle">
                            <p onClick={this.showTitleReplace}>
                                <div><img src="./src/images/1.png" /></div>
                                <span>修改标题</span>
                            </p>
                            <p onClick={this.showDemandReplace}>
                                <div><img src="./src/images/2.png" /></div>
                                <span>完善需求</span>
                            </p>
                            <p onClick={this.showDealReplace}>
                                <div><img src="./src/images/3.png" /></div>
                                <span>关闭交易</span>
                            </p>
                        </div>
                        <div className='task-manuscript'>
                            <h3>高手投标的稿件</h3>
                            <Tabs defaultActiveKey="1" animated={false}>
                                <TabPane tab="稿件数" key="1">
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: '8.1rem',
                                        backgroundColor: '#fff',
                                        textAlign: 'justify',
                                        fontSize: '0.8rem',
                                        overflow: 'auto',
                                        padding: '0.6rem',
                                        color: '#c2c2c2',
                                        fontFamily:'宋体'
                                    }}>
                                        暂无投稿，请耐心等待
                                    </div>
                                </TabPane>
                                <TabPane tab="留言" key="2">
                                    <div style={{
                                        paddingBottom: '0.6rem'
                                    }}>
                                        00000
                                    </div>
                                </TabPane>
                                <TabPane tab="评价" key="3">
                                    <div>
                                        000
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                    <div className="footer">
                        <Link to={`/renwu`}>
                            <div className="task-footer">返回任务频道</div>
                        </Link>
                    </div>
                    {this.state.onOff == true
                        ? <TaskModal showTitleReplace={this.showTitleReplace}/>
                        : null}
                    {this.state.show == true
                        ? <DemandModal showDemandReplace={this.showDemandReplace}/>
                        : null}
                    {this.state.sure == true
                        ? <CloseDeal showDealReplace={this.showDealReplace}/>
                        : null}
                </div>
            </QueueAnim>
        );
    }
}
