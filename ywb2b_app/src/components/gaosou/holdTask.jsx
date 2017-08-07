import {List, Popover, NavBar, Icon, Card} from 'antd-mobile';
import $ from "jquery";
import FootComponent from './../public/Foot';
import TaskItemComponent from './../task/moneyItem';
import * as https from './../../apis/api.jsx';

const Item = List.Item;
const Brief = Item.Brief;
var status = '';
const URL = 'http://120.76.78.213/tp5/public/index.php/v10/company/';

export default class HoldTaskComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.back = this.back.bind(this);
    }
    back = () => {
        window.history.back();
    }

    componentDidMount() {
        var _this = this;
        var resultArr = [];
        var Arr = [];
        $.ajax({type: 'get', url: https.api.holdTask}).done(function(data) {
            var json = data;
            json.map(function(res, index) {
                if (res.task_status === 0) {
                    status = '未付款'
                } else if (res.task_status === 1) {
                    status = '待审核'
                } else if (res.task_status === 2) {
                    status = '投稿中'
                } else if (res.task_status === 3) {
                    status = '选稿中'
                } else if (res.task_status === 4) {
                    status = '投票中'
                } else if (res.task_status === 5) {
                    status = '公示中'
                } else if (res.task_status === 6) {
                    status = '交付中'
                } else if (res.task_status === 7) {
                    status = '冻结中'
                } else if (res.task_status === 8) {
                    status = '结束'
                } else if (res.task_status === 9) {
                    status = '失败'
                } else if (res.task_status === 10) {
                    status = '审核失败'
                } else if (res.task_status === 11) {
                    status = '仲裁中'
                } else if (res.task_status === 'p2') {
                    status = '投标中'
                } else if (res.task_status === 'd2') {
                    status = '竞标中'
                } else if (res.task_status === 13) {
                    status = '交付冻结'
                }
                if (res.username == _this.props.params.name) {
                    Arr.push(res);
                }
            })
            for (var i=0; i<Arr.length; i++) {
               for (var j=i+1; j<Arr.length; j++) {
                  if (Arr[i].gone == Arr[j].gone) {
                      j=false;break;
                  }
               }
               if(j){resultArr.push(Arr[i])}
            }
            _this.setState({
                taskList: resultArr.map(function(res, index) {
                    if (resultArr.length != 0) {
                        return <Item className="task-item" arrow="empty">
                            <Brief>
                                <b style={{
                                    width: '10rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>{res.task_title}</b>
                                <span style={{
                                    paddingRight: '0.25rem',
                                    fontSize: "0.56rem",
                                    float: 'right'
                                }}>{res.area}</span>
                            </Brief>
                            <Brief style={{
                                color: '#464646',
                                fontSize: '0.45rem'
                            }}>
                                <div style={{
                                    width: '4.8rem',
                                    textAlign: 'left',
                                    float: "left"
                                }}>赏金:<span style={{
                            color: 'red'
                        }}>￥{res.task_cash}</span>
                                </div>
                                <div style={{
                                    width: '3rem',
                                    float: "left"
                                }}>{res.model_id == 1
                                        ? '单人悬赏'
                                        : '多人悬赏'}</div>
                                <div style={{
                                    width: '3.1rem',
                                    float: "left"
                                }}>
                                    稿件数:{res.work_num
                                        ? res.work_num
                                        : 0}
                                </div>
                                <div style={{
                                    width: '3rem',
                                    float: "left"
                                }}>状态:{status}</div>
                            </Brief>
                            <Brief style={{
                                color: '#464646',
                                fontSize: '0.5rem'
                            }}>
                                {res.task_desc}
                            </Brief>
                        </Item>
                    } else if (resultArr.length == 0) {
                        return <p>暂未发布任务</p>
                    }
                })
            })
        })
    }

    render() {
        return (
            <div>
                <NavBar className="nav-top" leftContent={< Icon type = "left" size = "lg" />} iconName={false} style={{
                    backgroundColor: "#F29926",
                    color: '#fff'
                }} mode="light" onLeftClick={this.back.bind(this)}>
                    高手任务
                </NavBar>
                <div className="content">
                    <div>
                        <h2 className="hold-h2">承接的任务</h2>
                    </div>
                    {this.state.taskList
                        ? this.state.taskList
                        : <img style={{
                            width: "1rem",
                            margin: '8rem auto',
                            height: '1rem'
                        }} src="./src/images/loading.gif"/>}
                </div>
                <FootComponent/>
            </div>
        );
    }

}
