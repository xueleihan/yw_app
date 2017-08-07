import React, {PropTypes} from 'react';
import {TextareaItem, Toast} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import './../../styles/taskOrder.less';
import $ from "jquery";
import * as https from './../../apis/api.jsx';
var id = 0;
export default class CloseDeal extends React.Component {
    constructor(props) {
        super(props);
        this.submitDeal = this.submitDeal.bind(this)
    }

    componentWillMount() {
        id = window.location.href.split('&')[1];
    }

    submitDeal() {
        var that = this;
        $.ajax({
            type: 'post',
            data: {
                task_id: id
            },
            async: false,
            url: https.api.endTask
        }).done((data) => {
            if (data.status == 200) {
                this.props.showDealReplace();
                Toast.success('关闭成功', 1, () => {
                    that.context.router.push(`/renwu`);
                });
            } else {
                this.props.showDealReplace();
                Toast.fail('关闭失败', 1, () => {});
            }
        })

    }

    render() {
        return (
            <QueueAnim className="task-modal-out" type="scaleY">
                <div className="am-popover-mask"></div>
                <div className="demo-thead task-title-replace" key="a">
                    <div className="task-modal">
                        <h2>关闭需求</h2>
                        <div className="info-box">
                            <div>
                                <h2>提示:</h2>
                                <p>
                                    1.订单关闭后不能再次开启
                                </p>
                                <p>
                                    2.已托管的赏金将会原路退还到您的余额帐户
                                </p>
                            </div>
                        </div>
                        <div className="button-box">
                            <div className='btn-cancel' onClick={this.props.showDealReplace}>取消</div>
                            <div className="btn-sure" onClick={this.submitDeal}>确认</div>
                        </div>
                    </div>
                </div>
            </QueueAnim>
        );
    }
};

CloseDeal.contextTypes = {
    router: React.PropTypes.isRequired
}
