import {Grid, List} from 'antd-mobile';
import $ from "jquery";
import * as https from './../../apis/api.jsx';
import './../../styles/grid.less';

const Item = List.Item;
const Brief = Item.Brief;

export default class GoodGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: null
        }
    }

    componentDidMount() {
        var _this = this;
        $.ajax({type: 'get', url: https.api.masterTotal}).done(function(data) {
            let json = data;
            _this.setState({
                dataList: json.map((res, i) => {
                    return <div className="grid-item">
                            <div>
                                <img src={res.avatarpic}/></div>
                            <div>{res.username}<img src={res.buyer_level} className="level"/></div>
                            <div>最近3月成交：</div>
                            <div className="total">{res.total_sales}</div>
                            <div className="business">主营：{res.business
                                    ? res.business
                                    : '暂未填写'}</div>
                        </div>
                })
            })
        })
    }

    render() {
        return (
            <div className="grid">
                {this.state.dataList}
            </div>
        );
    }
}
