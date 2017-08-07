import React, {PropTypes} from 'react';
import {
    Accordion,
    List,
    NavBar,
    Icon,
    Button,
    DatePicker,
    TextareaItem,
    Toast,
    Picker,
    Modal
} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import {Link} from 'react-router';
import moment from 'moment';
import 'moment/locale/zh-cn';
import $ from "jquery";
import * as https from './../../apis/api.jsx';
const STORAGE = window.localStorage;
var cate1 = '',
    cate2 = '',
    cate3 = '',
    indus_fid = 0,
    indus_pid = 0,
    indus_id = 0,
    data = null,
    str1 = '',
    str2 = '';

// format date
function getNowFormatDate() {
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    Year = day.getFullYear();
    Month = day.getMonth() + 1;
    if(Month == 1 || Month == 3 || Month ==  5 || Month ==  7 || Month == 8 || Month == 10 || Month == 12){
        Day = day.getDate()+1;
    }else{
        Day = day.getDate();
    }
    CurrentDate += Year + "-";
    if (Month >= 10) {
        CurrentDate += Month + "-";
    } else {
        CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10) {
        CurrentDate += Day;
    } else {
        CurrentDate += "0" + Day;
    }
    return CurrentDate;
}

// set start date
const maxDate = moment('2050-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
var newDate = getNowFormatDate();
// set end date
const minDate = moment(newDate + ' +0800', 'YYYY-MM-DD Z').utcOffset(8);
// set public element
const CustomChildren2 = props => (
    <div onClick={props.onClick} style={{
        backgroundColor: '#fff',
        height: '1.42rem',
        lineHeight: '1.42rem',
        padding: '0 1rem',
        fontSize: '0.54rem',
        color: '#464646'
    }}>
        {props.children}
        <div style={{
            float: 'right',
            color: '#888',
            width: '10rem',
            fontSize: '0.54rem',
            border: '1px solid #acacac',
            textAlign: 'left',
            paddingLeft: "0.2rem"
        }}>{props.extra}</div>
    </div>
);
const CustomChildren = props => (
    <div onClick={props.onClick} style={{
        backgroundColor: '#fff',
        height: '1.42rem',
        lineHeight: '1.42rem',
        padding: '0 1rem',
        fontSize: '0.54rem',
        color: '#464646'
    }}>
        {props.children}
        <span style={{
            float: 'right',
            color: '#888',
            width: '10rem',
            fontSize: '0.54rem',
            border: '1px solid #acacac',
            textAlign: 'left',
            paddingLeft: "0.2rem"
        }}>{props.extra}</span>
    </div>
);

const username = STORAGE.getItem('username');
const tel = STORAGE.getItem('tel');
const userid = STORAGE.getItem('uid');
export default class TaskDescribe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dpValue: null,
            mValue: '',
            currentIndex: 0,
            pickerValue: [],
            tValue: "",
            wValue: '',
            modal1: false,
            items: [
                {
                    name: '单人悬赏',
                    id: 0
                }, {
                    name: '多人悬赏',
                    id: 1
                }, {
                    name: '计件悬赏',
                    id: 2
                }, {
                    name: '普通招标',
                    id: 3
                }, {
                    name: '订金招标',
                    id: 4
                }, {
                    name: '速配任务',
                    id: 5
                }
            ]
        }; // default state
        this.submit = this.submit.bind(this);
        this.click = this.click.bind(this);
    }

    // 提交按钮事件
    submit() {
        var _this = this;
        $.ajax({type: 'get', url: https.api.city}).done((res) => {
            data = JSON.parse(res);
            data.map((res, index) => {
                if (res.value == _this.state.pickerValue[0]) {
                    str1 = res.label;
                    res.children.map((res, index) => {
                        if (res.value == _this.state.pickerValue[1]) {
                            str2 = res.label;
                        }
                    })
                }
            })

            var reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
            var result = reg.test(_this.state.mValue);
            const W_LENGTH = _this.state.wValue.length;
            if (result && W_LENGTH > 9 && _this.state.dpValue != null && _this.state.pickerValue != '' && _this.state.tValue != '') {
                $.ajax({
                    type: 'post',
                    url: https.api.pubtask,
                    data: {
                        'model_id': this.state.currentIndex,
                        'indus_fid': indus_fid,
                        'indus_pid': indus_pid,
                        'indus_id': indus_id,
                        'indus_sid': '1231',
                        'task_title': this.state.tValue,
                        'task_cash': this.state.mValue,
                        'end_time': this.state.dpValue._d.getFullYear() + '-' + (this.state.dpValue._d.getMonth() + 1) + '-' + this.state.dpValue._d.getDate(),
                        'area': str1 + str2,
                        'uid': userid,
                        'username': username,
                        'task_desc': this.state.wValue,
                    }
                }).done((data) => {
                    Toast.loading('正在发布...', 1, () => {
                        _this.context.router.push(`/taskResult&${data.task_id}/${indus_fid}`);
                    });
                })
            } else {
                alert('请查看信息是否填写正确，需求描述不得少于10个字符，预算必须是数字金额，所有内容都为必须填写。')
            }

        })
    }

    componentDidMount() {
        var itemid = this.props.params.id;
        $.ajax({type: 'get', url: https.api.city}).done((res) => {
            data = JSON.parse(res);
        })
        $.ajax({type: 'get',async:false, url: https.api.screen}).done((data) => {
            var dataResult = JSON.parse(data);
            dataResult.children.map((res, index) => {
                res.children.map((res1, index) => {
                    res1.children.map((res2, index) => {
                        if (res2.id == itemid) {
                            cate1 = res.name;
                            cate2 = res1.name;
                            cate3 = res2.name;
                            indus_fid = res.id;
                            indus_pid = res1.id;
                            indus_id = res2.id;
                        }
                    })
                })
            })
        }); // end
    }

    click() {
        window.history.back()
    }

    changeStyle(id) {
        this.setState({currentIndex: id})
    }

    render() {
        var itemList = this.state.items.map((res, index) => {
            var listStyle = res.id == this.state.currentIndex
                ? 'box-active box'
                : 'box'
            return <div className={listStyle} onClick={this.changeStyle.bind(this, res.id)}>
                <span>{res.name}</span>
            </div>
        })
        return (
            <QueueAnim style={{
                overflow: 'hidden'
            }} className="demo-content" type='right'>
                <div className="demo-thead" key="a" id='task-head'>
                    <NavBar className="nav-top" leftContent={<Icon type = "left" size = "lg" />} onLeftClick={this.click.bind(this)} iconName={false} style={{
                        backgroundColor: "#fff",
                        color: '#000'
                    }}>
                        任务描述
                    </NavBar>
                    <div className="task-con" style={{
                        width: '100%',
                        overflow: 'auto'
                    }}>
                        <div className="describe-h2">需求类型∶<span></span>{cate1}/<span></span>{cate2}/<span></span>{cate3}</div>
                        <div className="describe-con">
                            <p>请选择交易模式</p>
                            <div className="choose-box">
                                {itemList}
                            </div>
                            <div className="choose-form">
                                <span>您的预算：</span>
                                <input type="number" placeholder="￥" value={this.state.mValue} onChange={(e) => {
                                    this.setState({mValue: e.target.value});
                                }}/>
                                <div style={{
                                    clear: 'both',
                                    marginTop: '2.3rem'
                                }}>
                                    <DatePicker minDate={minDate} maxDate={maxDate} mode="date" value={this.state.dpValue} onChange={v => {
                                        this.setState({dpValue: v})
                                    }}>
                                        <CustomChildren>结束日期：</CustomChildren>
                                    </DatePicker>
                                </div>
                                <div style={{
                                    clear: 'both',
                                    marginTop: '1rem'
                                }}>
                                    <Picker data={data} cols={2} title="选择地区" extra="请选择(可选)" value={this.state.pickerValue} onChange={v => this.setState({pickerValue: v})}>
                                        <CustomChildren2>选择地区：</CustomChildren2>
                                    </Picker>
                                </div>
                                <div style={{
                                    clear: 'both',
                                    marginTop: '1rem'
                                }} className='am-textarea-control'>
                                    <span>需求标题：</span>
                                    <textarea placeholder="请输入标题..." rows="1" value={this.state.tValue} onChange={(v) => {
                                        this.setState({tValue: v.target.value});
                                    }}></textarea>
                                </div>

                                <div className='am-list-item am-textarea-item area-second'>
                                    <div style={{
                                        clear: 'both',
                                        marginTop: '1rem'
                                    }} className='am-textarea-control'>
                                        <textarea placeholder="请输入标题..." rows="1" value={this.state.wValue} onChange={(v) => {
                                            this.setState({wValue: v.target.value});
                                        }}></textarea>
                                    </div>
                                </div>
                                <div className="submit-btn" onClick={this.submit}>提交</div>
                            </div>
                        </div>
                    </div>
                </div>
            </QueueAnim>
        );
    }
}

TaskDescribe.contextTypes = {
    router: React.PropTypes.isRequired
}
