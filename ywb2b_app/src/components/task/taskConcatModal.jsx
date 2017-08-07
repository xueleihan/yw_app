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
            tValue: '',
            mValue: this.props.name,
            pValue: '',
            class:'task-title-replace demo-thead'
        }
        this.submitMessage = this.submitMessage.bind(this)
    }

    componentWillMount() {
        id = window.location.href.split('&')[1];
    }

    submitMessage() {
        var that = this;
        $.ajax({
            type: 'post',
            data: {
                fromuser:'peng',
                touser:that.state.mValue,
                title:this.state.pValue,
                content:this.state.tValue
            },
            async: false,
            url: https.api.sendEmail
        }).done((data) => {
            console.log(data);
            if (data.code == 200) {
                Toast.success('发送成功', 1, () => {
                    this.props.showModal();
                });
            } else {
                Toast.fail('发送失败', 1, () => {});
            }
        })
    }

    componentDidMount(){
        var _this = this;
        window.addEventListener('resize', function() {
            document.body.clientHeight <= 400
                ? _this.setState({class: 'demo-thead task-focus'})
                : _this.setState({class: 'task-title-replace demo-thead'});
        }, false);
    }

    render() {
        return (
            <QueueAnim className="task-modal-out" type="scaleY">
                <div className={this.state.class} key="a">
                    <div className="task-modal task-concat-modal" style={{
                        height: "20rem"
                    }}>
                        <h2>收件人:</h2>
                        <input type="text" value={this.state.mValue} onChange={(v) => {
                            this.setState({mValue: v.target.value});
                        }}/>
                        <h2>标题:</h2>
                        <input type="text" value={this.state.pValue} onChange={(v) => {
                            this.setState({pValue: v.target.value});
                        }}/>
                        <h2>消息:</h2>
                        <div className="area-box" style={{
                            height: "8.44rem"
                        }}>
                            <TextareaItem className="modal-area" rows="14" value={this.state.tValue} onChange={(v) => {
                                this.setState({tValue: v});
                            }}/>
                        </div>
                        <div className="button-box">
                            <div className='btn-cancel' onClick={this.props.showModal}>取消</div>
                            <div className="btn-sure" onClick={this.submitMessage}>确认</div>
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
