import {NavBar, Icon} from 'antd-mobile';
import $ from "jquery";
import {Link} from 'react-router';
import DetailFootComponent from './../public/detailFoot';
import QueueAnim from 'rc-queue-anim';
import * as https from './../../apis/api.jsx';

var itemid = null,
    itemName = null,
    shopItem = null,
    currentIndex = [],
    local = localStorage;

export default class ServerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: null
        };
        this.del = this.del.bind(this);
        this.add = this.add.bind(this);
        this.back = this.back.bind(this);
    }
    del = () => {}
    add = (id, num) => {
        var idArr = JSON.parse(local.getItem('cartId'));
        var numArr = JSON.parse(local.getItem('cartNum'));
        var i = 0;
        // 找到对应点击的商品的itemid在locaStorage中数组的位置
        idArr.map((res, index) => {
            if (res == id) {
                i = index;
            }
        })
        this.setState({
            number: num + 1
        })
        console.log(this.state.number);
        this.forceUpdate()
    }
    back = () => {
        window.history.back();
    }

    componentDidMount() {
        var _this = this;
        var imgList = [];

        var cartArr = JSON.parse(local.getItem('cartId'));
        var cartNum = JSON.parse(local.getItem('cartNum'));
        console.log(cartArr);
        console.log(cartNum);
        // 所有商品的接口
        $.ajax({type: 'get', async: false, url: https.api.mall}).done(res => {
            console.log(res);
            shopItem = res;
        });
        var arr = [];
        // 循环遍历找到对应的数据的下标放进数组中
        shopItem.map((res, index) => {
            for (var i = 0; i < cartArr.length; i++) {
                var result = null;
                if (res.itemid == cartArr[i]) {
                    currentIndex.push(i);
                    arr.push(res)
                }
            }
        })
        // 每一个订单的具体信息
        this.setState({
            cartItems: arr.map((res, index) => {
                return <div className="cart-items">
                    <h3>{res.username}-出售商品</h3>
                    <dl>
                        <dt>
                            <a href="javascript:;">
                                <img src={res.thumb} style={{
                                    border: "1px solid #ccc"
                                }}/>
                            </a>
                        </dt>
                        <dd style={{
                            height: '3.4rem'
                        }}>
                            <p>{res.title}</p>
                            <p>
                                <span>￥{res.price}</span>
                                x {cartNum[currentIndex[index]]}
                            </p>
                        </dd>
                    </dl>
                    <div className="cart-down">
                        <p className="order-num">
                            <span>购买数量</span>
                            <div className="order-choo">
                                <a href="javascript:;" onClick={this.del.bind(this, res.itemid)}>-</a>
                                <input type="text" value={this.state.number
                                    ? this.state.number
                                    : cartNum[currentIndex[index]]} style={{
                                    fontSize: '0.6rem'
                                }}/>
                                <a href="javascript:;" onClick={this.add.bind(this, res.itemid, cartNum[currentIndex[index]])}>+</a>
                            </div>
                        </p>
                        <p className="order-num">
                            <span>快递</span>
                            <div className="order-choo">
                                <span className="concat">联系卖家</span>
                            </div>
                        </p>
                        <p className="order-num">
                            <span>运费</span>
                            <div className="order-choo">
                                <span className="freight">￥1000.00</span>
                            </div>
                        </p>
                        <p className="order-num">
                            <div className="order-choo" style={{
                                fontSize: '0.6rem'
                            }}>
                                合计:<span className="freight">￥{cartNum[currentIndex[index]] != 0
                                        ? res.price * cartNum[currentIndex[index]] + 1000
                                        : 0}</span>
                            </div>
                        </p>
                    </div>
                </div>
            })
        })
    }

    render() {
        return (
            <QueueAnim style={{
                overflow: 'hidden'
            }} className="demo-content" type={['right', 'left']}>
                <div className="demo-thead" key="a">
                    <NavBar className="nav-top" leftContent={<Icon type = "left" size = "lg" />} iconName={false} style={{
                        backgroundColor: "#F29926",
                        color: '#fff'
                    }} mode="light" onLeftClick={this.back}>
                        确认订单
                    </NavBar>
                    <div className="content">
                        <div className="con-up">
                            <div className="con-left">
                                <i className="iconfont icon-weizhi"></i>
                            </div>
                            {/* 收货地址模块，暂时是固定的数据 */}
                            <div className="con-right">
                                <p>
                                    收货人：张小 13601889078
                                </p>
                                <p>收货地址：广东省东莞市 长安新区水中路南环街61号</p>
                                <p>邮政编码：512803
                                </p>
                            </div>
                        </div>
                        {this.state.cartItems}
                    </div>
                    <div className="order-footer">支付</div>
                </div>
            </QueueAnim>
        );
    }
}
