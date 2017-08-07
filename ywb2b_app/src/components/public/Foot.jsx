import {Flex} from 'antd-mobile';
import {Link} from 'react-router';
import "./../../styles/foot.less";


export default class FootComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            class: 'active',
            item: [
                {
                    info: <Link to={`/`} activeClassName="active"><a href="javascript:;" className="item">
                        <img src="./src/images/logo.png" className="footer-img"/>
                    </a></Link>,
                    text: null,
                    id: 1
                },
                {
                    info: <Link to={`/moneyDesc`} activeClassName="active"><i className="iconfont icon-templatedefault"></i></Link>,
                    text: '任务',
                    id: 2
                }, {
                    info: <Link to={`/mall`} activeClassName="active"><i className="iconfont icon-cart"></i></Link>,
                    text: '商城',
                    id: 3
                }, {
                    info: <Link to={`/supply`} activeClassName="active"><i className="iconfont icon-similarproduct"></i></Link>,
                    text: '供应',
                    id: 4
                }, {
                    info: <Link to={`/message`} activeClassName="active"><i className="iconfont icon-comments"></i></Link>,
                    text: '消息',
                    id: 5
                }, {
                    info: <Link to={`/me`} activeClassName="active"><i className="iconfont icon-account"></i></Link>,
                    text: '我的',
                    id: 6
                }
            ]
        };
    }

    render() {
        var _this = this;
        var tabList = this.state.item.map(function(res, index) {
            return <Flex.Item>{res.info}{res.text}</Flex.Item>
        }.bind(_this));
        return (
            <div className="footer">
                <Flex align="middle" justify="center">
                    {tabList}
                </Flex>
            </div>
        );
    }
}
