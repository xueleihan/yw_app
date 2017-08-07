import React from 'react';
import {NavBar, Icon, Tabs, Result} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import {Link} from 'react-router';
import $ from "jquery";
import './../../styles/taskOrder.less';

export default class taskPayResult extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        window.history.back()
    }

    render() {
        return (
            <QueueAnim style={{
                overflow: 'hidden'
            }} className="demo-content" type='right'>
                <div className="demo-thead" key="a" id='task-pay-res-head'>
                    <NavBar className="nav-top" leftContent={<Icon type = "left" size = "lg" />} onLeftClick={this.click} iconName={false} style={{
                        backgroundColor: "#F29926",
                        color: '#fff'
                    }} mode="light">
                        托管赏金
                    </NavBar>
                    <div className="task-content">
                        <Result img={< Icon type = "check-circle" size = "lg" className = "icon" style = {{ fill: '#80C632',top:"1.9rem" }}/>} title="支付成功！"/>
                        <div className="task-desc">
                            <Link to={`/mkTask`}><div>继续发布</div></Link>
                            <Link to={`/taskDetail&${this.props.params.id}`}><div>查看订单</div></Link>
                        </div>
                    </div>
                </div>
            </QueueAnim>
        );
    }
}
