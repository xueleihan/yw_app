import {List, Popover, NavBar, Icon, Card} from 'antd-mobile';
import $ from "jquery";
import {Link} from 'react-router';
import FootComponent from './../public/Foot';
import TaskItemComponent from './../task/moneyItem';
import * as https from './../../apis/api.jsx';

const Item = List.Item;
const Brief = Item.Brief;
var shopItem = null;
var itemName = null;
// 出售商品的列表页
export default class Albumsort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.back = this.back.bind(this);
    }
    back = () => {
        window.history.back();
    }

componentDidMount () {
        var _this = this;
        $.ajax({type:'get',async:false,url:https.api.mall}).done(function(res){
            shopItem = res;
        })
        var itemArr = [];
        shopItem.map(function(res,index){
            if(_this.props.params.name == res.username){
                itemArr.push(res);
            }
        })
        itemName = this.props.params.name.split("&")[0];
        _this.setState({
            items:itemArr.map((res,index) => {
                return <div className="list-item">
                    <dl>
                        <dt>
                            <Link to={`listDetail/${_this.props.params.name}&${res.itemid}`}><img src={res.thumb}/></Link>
                        </dt>
                        <dd>
                            <p>{res.title}</p>
                            <p>单价：<span>{res.price}</span></p>
                            <p>品牌：{res.brand||'未填写'}</p>
                            <p>销量：累计出售{res.sales}件</p>
                            <p>地区：{res.address||'暂未填写'}</p>
                        </dd>
                    </dl>
                </div>
            })
        })
    }

    render() {
        return (
            <div>
                <NavBar className="nav-top" leftContent={< Icon type = "left" size = "lg" />} iconName={false} style={{
                    backgroundColor: "#F29926",
                    color: '#fff'
                }} mode="light" onLeftClick={this.back}>
                    {itemName}
                </NavBar>
                <div className="content">
                    <h2 className="hold-h2">出售商品</h2>
                    {this.state.items}
                </div>
                <FootComponent/>
            </div>
        );
    }
}
