import React from 'react';
import {List, Toast, NavBar, Icon} from 'antd-mobile';
import {Link} from 'react-router';
import $ from "jquery";
import QueueAnim from 'rc-queue-anim';
import * as https from './../../apis/api.jsx';
import './../../styles/login.less';
import FootComponent from './../../components/public/Foot';
import md5 from 'md5-hex';

const Item = List.Item;
const Brief = Item.Brief;
var comList = [];
const STORAGE = window.localStorage;

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue:'',
            pwdValue:'',
            show:true
        }
        this.login = this.login.bind(this);
        this.click = this.click.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePwd = this.changePwd.bind(this);
    }

    click() {
        window.history.back()
    }

    login() {
        var reg = /^[a-z0-9_-]{4,16}$/;
        var name = this.state.nameValue;
        var that = this;
        var oldHref = STORAGE.getItem('oldHref');
        if (reg.test(name)) {
            Toast.loading('正在登录...', 1, () => {
                $.ajax({
                    type: 'post',
                    url: https.api.login,
                    data: {
                        username: name,
                        password: that.state.pwdValue
                    }
                }).done((data) => {
                    console.log(data);
                    if (data.code == '200') {
                        STORAGE.setItem('isLogin',true);
                        STORAGE.setItem('username',name);
                        STORAGE.setItem('uid',data.useinfo.userid);
                        this.context.router.replace(oldHref);
                    }else{
                        alert(data.msg)
                    }
                });
            })
        }else{
            alert('请输入正确的用户名！')
        }
    }

    componentDidMount(){
        var _this = this;
        window.addEventListener('resize', function() {
            document.body.clientHeight <= 400
                ? _this.setState({show: false})
                : _this.setState({show: true});
        }, false);
    }

    changeName(e) {
        var username = e.target.value
        this.setState({nameValue: username})
    }

    changePwd(e){
        var password = e.target.value;
        this.setState({pwdValue: password})
    }

    render() {
        return (
            <QueueAnim style={{
                overflow: 'hidden'
            }} className="demo-content" type='right'>
                <div className="demo-thead" key="a">
                    <NavBar className="nav-top" leftContent={< Icon type = "left" size = "lg" />} onLeftClick={this.click.bind(this)} iconName={false} style={{
                        backgroundColor: "#f7991d",
                        color: '#fff'
                    }} mode="light">
                        登录
                    </NavBar>
                    <div className="wrap" style={{
                        width: '100%',
                        overflow: 'hidden'
                    }}>
                        <div className="login-user">
                            <span>用户名：</span>
                            <input type="text" value={this.state.nameValue} onChange={this.changeName}/>
                        </div>
                        <div className="login-pwd">
                            <span>密码：</span>
                            <input type="password"  value={this.state.pwdValue} onChange={this.changePwd}/>
                        </div>
                        <div className="login-btn">
                            <a href="javascript:;">注册</a>
                            <a href="javascript:;" onClick={this.login}>登录</a>
                        </div>
                        <div className="login-find">
                            <a href="javascript:;">找回密码</a>
                        </div>
                    </div>
                    {this.state.show?<FootComponent/>:null}
                </div>
            </QueueAnim>
        );
    }
}
LoginComponent.contextTypes = {
    router: React.PropTypes.isRequired
}
