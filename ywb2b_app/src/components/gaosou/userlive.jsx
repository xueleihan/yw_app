import {List, Popover, NavBar, Icon, Card} from 'antd-mobile';
import $ from "jquery";
import {Link} from 'react-router';
import * as https from './../../apis/api.jsx';
import FootComponent from './../public/Foot';
import TaskItemComponent from './../task/moneyItem';

const Item = List.Item;
const Brief = Item.Brief;
var liveItem = null;
var liveResult = [];

export default class Albumsort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            listArr:[]
        };
        this.back = this.back.bind(this);
    }
    back = () => {
        window.history.back();
    }

    componentDidMount() {
        var _this = this;
        $.ajax({type:'get',async:false,url: https.api.news}).done(function(res){
            res.map(function(res,index){
                if(_this.props.params.name == res.username){
                    liveResult.push(res);
                }
            })
            _this.setState({
                listArr:liveResult,
                liveitems:liveResult.map((res,index) => {
                    return <div className="userlive-item">
                        <p className="userlive-p">
                            <span>{res.title}</span>
                            <span>{res.addtime}</span>
                        </p>
                        <p className="userlive-con">
                            {res.content||"暂未填写"}
                        </p>
                    </div>
                })
            })
        })
    }

    render() {
        return (
            <div>
                <NavBar className="nav-top" leftContent={<Icon type = "left" size = "lg" />} iconName={false} style={{
                    backgroundColor: "#F29926",
                    color: '#fff'
                }} mode="light" onLeftClick={this.back}>
                    江湖经历
                </NavBar>
                <div className="content">
                    <h2 className="hold-h2">项目案例</h2>
                    {this.state.listArr.length == 0?<p className="p-none">暂未填写</p>:this.state.liveitems}
                </div>
                <FootComponent/>
            </div>
        );
    }

}
