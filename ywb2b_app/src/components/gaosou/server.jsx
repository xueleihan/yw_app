import {Popover, List, NavBar, Icon, Tabs} from 'antd-mobile';
import {Link} from 'react-router';
import FootComponent from './../public/Foot';
import $ from "jquery";
import QueueAnim from 'rc-queue-anim';
import * as https from './../../apis/api.jsx';

const ListItem = List.Item;
const Brief = ListItem.Brief;
const Item = Popover.Item;
const TabPane = Tabs.TabPane;

var concatResult = null;

export default class ServerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            concat:{}
        }
        this.click = this.click.bind(this);
    }

    click = () => {
        window.history.back();
    }

    componentDidMount() {
        var _this = this;
        $.ajax({type: 'get', url: https.api.contact}).done(function(res) {
            res.map(function(res, index) {
                if (_this.props.params.name == res.username) {
                    _this.setState({concat : res});
                }
            })
        });

    }

    render() {
        return (
            <QueueAnim style={{
                overflow: 'hidden'
            }} className="demo-content" type={['right', 'left']}>
                <div className="demo-thead" key="a">
                    <NavBar className="nav-top" leftContent={< Icon type = "left" size = "lg" />} iconName={false} style={{
                        backgroundColor: "#F29926",
                        color: '#fff'
                    }} mode="light" onLeftClick={this.click.bind(this)}>
                        {this.props.params.name}
                    </NavBar>
                    <div className="content">
                        <div className="user-concat">
                            <h2>服务保障</h2>
                            <Brief>公司名称： {this.state.concat.company || '暂未填写'}</Brief>
                            <Brief>公司类型：{this.state.concat.type || '暂未填写'}</Brief>
                            <Brief>所在地：{this.state.concat.address || '暂未填写'}</Brief>
                            <Brief>公司规模：{this.state.concat.size || '暂未填写'}
                            </Brief>
                            <Brief>注册资本：{this.state.concat.capital + '万人民币' || '暂未填写'}</Brief>
                            <Brief>注册年份：{this.state.concat.regyear
                                    ? this.state.concat.regyear + '年'
                                    : '暂未填写'}</Brief>
                            <Brief style={{
                                display: 'flex'
                            }}>资料认证： {this.state.concat.vcompany == 1
                                    ? <img style={{
                                            display: 'inline-block'
                                        }} src="http://120.76.78.213/gaosou/member/image/v_company.gif" width="16" height="16" align="absmiddle" title="资料通过工商认证"/>
                                    : null}
                                {this.state.concat.vemail == 1
                                    ? <img style={{
                                            display: 'inline-block'
                                        }} src="http://120.76.78.213/gaosou/member/image/v_email.gif" width="16" height="16" align="absmiddle" title="资料通过邮件认证"/>
                                    : null}
                            </Brief>
                            <Brief>保证金：已缴纳 {this.state.concat.deposit}
                                元</Brief>
                            <Brief>经营模式：{this.state.concat.mode || "暂未填写"}
                            </Brief>
                            <Brief style={{
                                lineHeight: '1.5'
                            }}>经营范围：{this.state.concat.business || "暂未填写"}</Brief>
                        </div>
                    </div>
                    <FootComponent/>
                </div>
            </QueueAnim>
        );
    }
}
