import React, {PropTypes} from 'react';
import {TextareaItem} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import './../../styles/taskOrder.less';
export default class WarningText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            class: 'task-modal-out'
        }
        this.submitDeal = this.submitDeal.bind(this);
    }

    submitDeal() {
        this.setState({
            class: 'task-modal-out hide'
        })
    }

    render() {
        return (
            <QueueAnim className={this.state.class} type="scaleY">
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
        );
    }
}
