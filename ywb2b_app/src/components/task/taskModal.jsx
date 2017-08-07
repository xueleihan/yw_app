import React, {PropTypes} from 'react';
import {TextareaItem, Toast} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import $ from "jquery";
import './../../styles/taskOrder.less';
import * as https from './../../apis/api.jsx';
var id = 0;
export default class TaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tValue: ''
        }
        this.submitModal = this.submitModal.bind(this);
    }

    componentWillMount() {
        id = window.location.href.split('&')[1];
    }

    submitModal() {
        var that = this;
        $.ajax({
            type: 'post',
            data: {
                task_title: that.state.tValue,
                task_id: id
            },
            async: false,
            url: https.api.modifyTitle
        }).done((data) => {
            if (data.status == 200) {
                this.props.showTitleReplace();
                Toast.success('修改成功', 1, () => {
                    that.context.router.push(`/taskDetail&${id}`);
                });
            }else {
                this.props.showTitleReplace();
                Toast.fail('修改失败,最少2个汉字且不能超过20个汉字', 1, () => {

                });
            }
        })
    }

    render() {
        return (
            <QueueAnim className="task-modal-out" type="scaleY">
                <div className="am-popover-mask"></div>
                <div className="demo-thead task-title-replace" key="a">
                    <div className="task-modal">
                        <h2>重设标题</h2>
                        <p>请重新输入订单标题:</p>
                        <div className="area-box"><TextareaItem className="modal-area" rows="4" value={this.state.tValue} onChange={(v) => {
                this.setState({tValue: v});
            }}/></div>
                        <div className="button-box">
                            <div className='btn-cancel' onClick={this.props.showTitleReplace}>取消</div>
                            <div className="btn-sure" onClick={this.submitModal}>确认</div>
                        </div>
                    </div>
                </div>
            </QueueAnim>
        );
    }
}


TaskModal.contextTypes = {
    router: React.PropTypes.isRequired
}
