import {List} from 'antd-mobile';
import $ from "jquery";
import Goodsort from './goodsort'
import Totalsort from './totalsort'
import * as https from './../../apis/api.jsx';

const Item = List.Item;
const Brief = Item.Brief;

export default class ItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.turnover = this.turnover.bind(this);
        this.good = this.good.bind(this);
        this.chooseComponent = this.chooseComponent.bind(this);
        this.state = {
            itemList: null,
            onOff: true,
            currentIndex: 1,
            sortIndex: 1,
            sortnum: 2,
            tabs: [
                {
                    tabName: <i className="iconfont icon-list"></i>,
                    id: 1
                }, {
                    tabName: <i className="iconfont icon-cascades"></i>,
                    id: 2
                }
            ],
            sorts: [
                {
                    sortsName: '成交额',
                    id: 1,
                    fun: this.turnover
                }, {
                    sortsName: '好评',
                    id: 2,
                    fun: this.good
                }
            ]
        }
    }
    turnover(){
        this.setState({
            sortnum:2
        })
    }

    good(){
        this.setState({
            sortnum:3
        })
    }
    clickHandle() {
        window.location.href = 'http://120.76.78.213/gaosou/main.html';
    }
    getdata(){
        var _this = this;
        $.ajax({type: 'get', url: https.api.master}).done(function(res) {
            var data = res;
            _this.setState({
                data: data,
                itemList: data.map(function(res, index) {
                    return <Item arrow="empty" multipleLine onClick={() => {}} platform="android">
                        <div className="Item-left">
                            <a href="javascript:;">
                                <img src="http://120.76.78.213/gaosou/file/upload/default.jpg"/>
                            </a>
                        </div>
                        <div className="Item-right">
                            <Brief style={{
                                fontSize: '0.55rem',
                                color: "#464646"
                            }}>{res.username}<img src="./src/images/level_01.png" className="Brief-img"/>
                                <span>最近3月成交：<em>{res.total_sales}</em>
                                </span>
                            </Brief>
                            <Brief style={{
                                fontSize: '0.55rem',
                                color: "#464646"
                            }}>好评率：<em>0%</em>
                            </Brief>
                            <Brief style={{
                                width: '100%',
                                fontSize: '0.55rem',
                                color: "#464646"
                            }}>主营：{res.business
                                    ? res.business
                                    : "暂未填写"}</Brief>
                        </div>
                    </Item>
                })
            })
        })
    }
    componentDidMount() {
        this.getdata();
    }
    changeStyle(id) {
        this.setState({
            onOff: !this.state.onOff,
            currentIndex: id
        })
    }

    changeSort(id) {
        this.setState({
            sortIndex: id
        })
    }

    chooseComponent(){
        if (this.state.sortnum == 2) {
            return <Totalsort onOff={this.state.onOff}/>
        }else if (this.state.sortnum == 3) {
            return <div><Goodsort onOff={this.state.onOff}/></div>
        }

    }

    render() {
        var _this = this;
        var tabList = this.state.tabs.map(function(res, index) {
            var tabStyle = res.id == this.state.currentIndex
                ? 'active'
                : '';
            return <li onClick={this.changeStyle.bind(_this, res.id)} className={tabStyle}>
                {res.tabName}
            </li>
        }.bind(_this));

        var sortList = this.state.sorts.map(function(res, index) {
            var sortStyle = res.id == this.state.sortIndex
                ? {color:"#f29926"}
                : {color:"#464646"};
            return <li style={sortStyle} onClick={this.changeSort.bind(_this,res.id)}>
                <a href="javascript:;" onClick={res.fun} style={sortStyle}>{res.sortsName}</a>
            </li>
        }.bind(_this));
        return (
            <div style={{overflow:'auto'}}>
                <div className="Item-head">
                    <ul>
                        <li>
                            <i className="iconfont icon-zuojiantou"></i>
                            <a herf="javascript:;" onClick={this.clickHandle}>返回网页版</a>
                        </li>
                        {sortList}
                        {tabList}
                    </ul>
                </div>
                    {this.chooseComponent()}
            </div>
        );
    }
}
