import React, {PropTypes} from 'react';
import {List, Popover, NavBar, Icon, Card} from 'antd-mobile';
import $ from "jquery";
import FootComponent from './../public/Foot';
import * as https from './../../apis/api.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const Item = List.Item;
const Brief = Item.Brief;
var picItem = null;
var arr = [];
const storage = window.localStorage;

export default class Albumsort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selected: ''
        }
        this.back = this.back.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    };
    back = () =>  {
        window.history.back();
    };
    onSelect = (opt) => {
        this.setState({visible: false, selected: opt.props.value});
        console.log(opt);
    };
    handleVisibleChange = (visible) => {
        this.setState({visible});
    };
    goDetail(href){
        var sTop = $('.content').scrollTop();
        var bTop = storage.getItem('top');
        if (bTop) {
            storage.removeItem('top');
            storage.setItem('top',sTop);
            this.context.router.push(href);
        } else {
            storage.setItem('top',sTop);
            this.context.router.push(href);
        }
    }
    componentDidMount(){
        var bTop = storage.getItem('top');
        if (bTop) {
            $('.content').scrollTop(bTop);
            storage.removeItem('top')
        }
        var _this = this;
        $.ajax({"type":'get',async:false,url:https.api.pictureSon}).done((data) => {
            picItem = data;
        });
        arr.length = 0;
        picItem.map((res,index) => {
            if(res.itemid == _this.props.params.id){
                arr.push(res)
            }
        })
        this.setState({
            Items:arr.map((res, index) => {
                return <dl key={index} onClick={this.goDetail.bind(this,`/detail/${this.props.params.name}&${res.itemid}&${index}`)}>
                    <dt><img className="album-pic" src={res.thumb}/></dt>
                    <dd>
                        <Brief>简介：{res.introduce||'暂未填写'}</Brief>
                        <Brief>日期：{res.edittime}</Brief>
                        <Brief>点击：{res.hits}</Brief>
                        <div onClick={this.goDetail.bind(this,`/detail/${this.props.params.name}&${res.itemid}&${index}`)} className="album-more">
                            <Brief className="album-more" style={{marginRight:'0.6rem'}}>更多></Brief>
                        </div>
                    </dd>
                    </dl>
            })
        })
    }

    render() {
        let offsetX = -10;
        let offsetY = -10;
        return (
            <div className="alb-con">
                <NavBar className="nav-top" leftContent={<Icon type="left" size="lg" />} iconName={false} style={{backgroundColor:"#F29926",color:'#fff'}} mode="light" onLeftClick={this.back} rightContent={
                  <Popover mask
                    visible={this.state.visible}
                    overlay={[
                        (<Item key="4" value="scan"  style={{padding:'0.2rem 1.35rem',fontSize: '0.56rem',color: '#000'}}>关注</Item>),
                        (<Item key="5" value="special" style={{padding:'0.2rem 1.35rem',whiteSpace: 'nowrap',fontSize: '0.56rem',color: '#000'}} >拉黑</Item>),
                    ]}
                    popupAlign={{
                      overflow: { adjustY: 0, adjustX: 0 },
                      offset: [offsetX, 5],
                      offset: [offsetY, 5],
                    }}
                    onVisibleChange={this.handleVisibleChange}
                    onSelect={this.onSelect}>
                    <div style={{
                      height: '100%',
                      padding: '0 0.3rem',
                      marginRight: '-0.3rem',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      <Icon type="ellipsis" size="lg" />
                    </div>
                  </Popover>
                }>
                  {this.props.params.name}
                </NavBar>
                <div className="content">
                    <h2 className="album-h2">公司画册{arr.length}/P</h2>
                    {this.state.Items}
                </div>
                <FootComponent/>
            </div>
        );
    }
}

Albumsort.contextTypes = {
    router: React.PropTypes.isRequired
}
