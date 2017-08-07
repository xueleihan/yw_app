import React, {PropTypes} from 'react';
import {TextareaItem, Toast} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import './../../styles/taskOrder.less';
import $ from "jquery";
import * as https from './../../apis/api.jsx';
var id = 0;
export default class DemandModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tValue: ''
        }
        this.submitDemand = this.submitDemand.bind(this);
    }

    componentWillMount() {
        id = window.location.href.split('&')[1];
    }

    submitDemand() {
        var that = this;
        $.ajax({
            type: 'post',
            data: {
                task_desc: that.state.tValue,
                task_id: id
            },
            async: false,
            url: https.api.modifyDesc
        }).done((data) => {
            if (data.status == 200) {
                this.props.showDemandReplace();
                Toast.success('修改成功', 1, () => {
                    that.context.router.push(`/taskDetail&${id}`);
                });
            } else {
                this.props.showDemandReplace();
                Toast.fail('修改失败,最少10个汉字且不能超过200个汉字', 1, () => {});
            }
        })
    }

    render() {
        return (
            <QueueAnim className="task-modal-out" type="scaleY">
                <div className="am-popover-mask"></div>
                <div className="demo-thead task-title-replace" key="a">
                    <div className="task-modal" style={{
                        height: "18.6rem"
                    }}>
                        <h2>编辑需求</h2>
                        <p>请重新描述您的需求:</p>
                        <div className="area-box" style={{
                            height: "12.32rem"
                        }}><TextareaItem className="modal-area" rows="20" value={this.state.tValue} onChange={(v) => {
                this.setState({tValue: v});
            }}/></div>
                        <div className="button-box">
                            <div className='btn-cancel' onClick={this.props.showDemandReplace}>取消</div>
                            <div className="btn-sure" onClick={this.submitDemand}>确认</div>
                        </div>
                    </div>
                </div>
            </QueueAnim>
        );
    }
}


DemandModal.contextTypes = {
    router: React.PropTypes.isRequired
}
