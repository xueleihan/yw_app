import React from 'react';
import './../../styles/header.less';
import {Link} from 'react-router';
import {NavBar} from 'antd-mobile';
import ScreenComponent from './../gaosou/screen';

const storage = window.localStorage;

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isIn:false
        }
        this.clickHandle = this.clickHandle.bind(this);
        this.goToMktask = this.goToMktask.bind(this);
    }

    static defaultProps(){
        this.props.isIn = false;
    }

    clickHandle(){
        this.setState({
            isIn:!this.state.isIn
        });
    }
    goToMktask(){
        if (storage.getItem('isLogin') == 'true') {
            this.context.router.push('/mkTask');
        } else {
            var href = this.context.router.location.pathname;
            storage.setItem('oldHref', href)
            this.context.router.replace('/login');
        }
    }

    render() {
        return (
            <header>
                <div className="header-left" onClick={this.goToMktask}>
                    {/* <Link to={`/mkTask`}> */}
                        <a href="javascript:;">
                            <i className="iconfont icon-icon"></i>
                            <span>发任务</span>
                        </a>
                </div>
                <div className="header-center">
                    <input type="text" placeholder="输入搜索的内容"/>
                    <i className="iconfont icon-search"></i>
                </div>
                <div className="header-right" onClick={this.clickHandle}>
                    <a href="javascript:;">
                        <i className="iconfont icon-fenlei"></i>
                        <span>接任务</span>
                    </a>
                </div>
                {this.state.isIn==true?<ScreenComponent clickHandle={this.clickHandle}/>:null}
            </header>
        );
    }
}

Header.contextTypes = {
    router: React.PropTypes.isRequired
}
