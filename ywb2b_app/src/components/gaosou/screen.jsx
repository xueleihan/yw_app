import QueueAnim from 'rc-queue-anim';
import {Button, Accordion, List, Tag} from 'antd-mobile';
import React from 'react';
import $ from "jquery";
import "./../../styles/screen.less";
import * as https from './../../apis/api.jsx';
export default class ScreenComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isIn: true,
            data: null,
            classList: null,
            skillList: null,
            currentIndex: 1,
            commodityList: null,
            className: 'tabs-item',
            isSelected:false
        }
        this.tabClick = this.tabClick.bind(this);
        this.close = this.close.bind(this);
        this.postClassify = this.postClassify.bind(this);
        this.choose = this.choose.bind(this);
    }

    componentDidMount() {
        var _this = this;
        $.ajax({type: 'get', url: https.api.screen}).done(function(data) {
            var data = JSON.parse(data);
            var classify = data.children;
            _this.setState({
                classList: classify.map(function(res, index) {
                    var skill = res.children;
                    _this.setState({
                        skillList: skill.map(function(res, index) {
                            var commodity = res.children;
                            _this.setState({
                                commodityList: commodity.map(function(res, index) {
                                    return <Tag>{res.name}<i className="tag-i" style={{display:'none'}}>{res.id}</i></Tag>
                                })
                            })
                            return <Accordion.Panel key={index} header={res.name}  className="pad" >
                                <div>
                                    {_this.state.commodityList}
                                </div>
                            </Accordion.Panel>
                        })
                    })
                    return <Accordion.Panel key={index} header={' > '+res.name} style={{backgroundColor:'rgba(235,235,235,0.5)'}}>
                        <Accordion accordion defaultActiveKey="0">
                            {_this.state.skillList}
                        </Accordion>
                    </Accordion.Panel>
                })
            }) // setState end first

        }) // ajax end

    }

    tabClick() {
        this.setState({className: 'tabs-item tabs-active'})
    }

    close(){
        this.setState({isIn: false})
        this.props.clickHandle()
    }

    // find the element who is checked then post to api and return some data.
    postClassify() {
        var resultArr = [];
        $('.am-tag').each((index, res) => {
            if (res.className == 'am-tag am-tag-active') {
                resultArr.push(res)
                // choose item's id
                console.log(res.childNodes[0].childNodes[3].innerText);
            }
        })
        if (resultArr.length >1) {
            alert('只能选择一个哦！')
        } else if (resultArr.length < 1) {
            alert('请选择一个分类')
        } else {
            console.log(resultArr[0].innerText);
            this.setState({isIn: false})
            this.props.clickHandle()
        }
    }

    choose(){
        $('.am-tag').each((index, res) => {
            res.className = 'am-tag-normal am-tag'
        })
    }

    render() {
        return (
            <QueueAnim type='right'>
                <div key="demo1" style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '13.4rem',
                    background: '#fff',
                    height: '100%',
                    zIndex: 10000,
                    overflow: 'auto'
                }}>
                    <div className="scr-classify">行业分类
                        <span onClick={this.close} style={{
                            float:"right",
                            paddingRight:'1rem',
                            color:'#acacac'
                        }} className="iconfont icon-dianyuan"></span>
                    </div>
                    <Accordion accordion defaultActiveKey="0" className="my-accordion" id="accor">
                        {this.state.classList?this.state.classList:<img style={{ width:"1rem",margin:'8rem auto',height:'1rem'}} src="./src/images/loading.gif"/>}
                    </Accordion>
                    <Button type="ghost" className="scr-ok" style={{
                        background: '#80C632',
                        borderColor: '#80C632',
                        fontSize:'0.5rem',
                        color:'#fff'
                    }}  onClick={this.choose}>重置</Button>
                    <Button style={{
                        background: '#F96506',
                        borderColor: '#F96506',
                        fontSize:'0.5rem',
                        color:'#fff'
                    }} type="ghost" onClick={this.postClassify} className="scr-ok">完成</Button>
                </div>
            </QueueAnim>
        );
    }
}
