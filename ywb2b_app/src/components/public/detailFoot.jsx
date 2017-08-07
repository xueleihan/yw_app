import {Flex} from 'antd-mobile';
import {Link} from 'react-router';
import "./../../styles/foot.less";
const STORAGE = window.localStorage;
const isLogin = STORAGE.getItem('isLogin');
export default class DetailFootComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            class: 'active',
            show:this.props.show
        };
        this.goPay = this.goPay.bind(this);
    }

    goPay(){
        `pay/${this.props.itemid}&${this.props.itemName}`
        if (isLogin) {
            this.context.router.push(`pay/${this.props.itemid}&${this.props.itemName}`)
        }else {
            STORAGE.setItem('oldHref',this.context.router.location.pathname)
            this.context.router.push('/login')
        }
    }

    render() {
        return (
            <div className="detail-footer">
                <div className="foot-item">
                    <Link to={`/`} className="l logo">
                        <a href="javascript:;" className="item">
                            <img src="./src/images/logo.png" className="footer-img"/>
                        </a>
                    </Link>
                    <div className="l mes"><i className="iconfont icon-comments"></i>客服</div>
                    <div className="l mes"><i className="iconfont icon-xingxing"></i>收藏</div>
                    <Link to={`shopcar/${this.props.itemid}&${this.props.itemName}`}><a className="cart-btn l" href="javascript:;">加入购物车</a></Link>
                    <a className="buy-btn l" onClick={this.goPay} href="javascript:;">立即购买</a>
                </div>
            </div>
        );
    }
}
DetailFootComponent.contextTypes = {
    router: React.PropTypes.isRequired
}
