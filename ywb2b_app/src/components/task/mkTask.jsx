import React from 'react';
import {Accordion, List, NavBar, Icon, Button} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import {Link} from 'react-router';
import './../../styles/mkTask.less';
import $ from "jquery";
import * as https from './../../apis/api.jsx';

// some variables
var dataResult = [];
var arr = [];

export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            leftIndex: 0,
            data:[]
        }
        this.click = this.click.bind(this);
        this.changeLeftIndex = this.changeLeftIndex.bind(this);
    }

    chooseLeft(id) {
        this.setState({currentIndex: id})
    }
    changeLeftIndex(key) {
        this.setState({leftIndex: key})
    }

    componentDidMount() {
        var _this = this;
        $.ajax({type: 'get', url: https.api.screen}).done(function(data) {
            dataResult = JSON.parse(data).children;

            _this.setState({
                data: dataResult,
                leftheader: dataResult.map((res, index) => {
                    var skillList = res.children;
                })
            });
        });

    }

    click() {
        window.history.back()
    }

    render() {
        var _this = this;
        var leftheader = this.state.data.map((res, index) => {
            // 左边的模块
            return <Accordion.Panel header={res.name} key={index}>
                {res.children.map((res, index) => {
                    var boxStyle = index == _this.state.currentIndex
                        ? 'am-button-active am-button'
                        : 'am-button'
                    return <div className={boxStyle} onClick={_this.chooseLeft.bind(_this, index)}>{res.name}</div>
                })
}
            </Accordion.Panel>
        });
        // 右边的模块
        var taskbody = this.state.data.map((res, index) => {
            var bodyStyle = index == _this.state.leftIndex
                ? ' show'
                : 'hide'
            // 五个大分类对应的右边的每块分类
            return <div className={bodyStyle}>
                {res.children.map((res, index) => {
                    var itemStyle = index == _this.state.currentIndex
                        ? 'task-body show'
                        : 'task-body hide'
                    // 每一块里面的展示出来的分类
                    return <div className={itemStyle}>
                        {res.children.map((res, index) => {
                            return <Link to={`/taskDescribe&${res.id}`}>
                                <Button>{res.name}</Button>
                            </Link>
                        })
}
                    </div>
                })
}
            </div>
        })

        return (
            <QueueAnim style={{
                overflow: 'hidden'
            }} className="demo-content" type='right'>
                <div className="demo-thead" key="a" id="task-head">
                    <NavBar className="nav-top" leftContent={< Icon type = "left" size = "lg" />} onLeftClick={this.click} iconName={false} style={{
                        backgroundColor: "#fff",
                        color: '#000'
                    }} mode="light">
                        选择需求类型
                    </NavBar>
                    <div className="task-con">
                        <div className="task-left">
                            <p className="task-top-p">热门分类</p>
                            <Accordion accordion defaultActiveKey="0" className="my-accordion" onChange={this.changeLeftIndex}>
                                {leftheader}
                            </Accordion>
                        </div>
                        <div className="task-right">
                            <h2>热门</h2>
                            {taskbody}
                        </div>
                    </div>
                </div>
            </QueueAnim>
        );
    }
}
