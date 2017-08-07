import {Flex, List, Tag, Button} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import {Link} from 'react-router';
import * as https from './../../apis/api.jsx';
const $ = require('jquery');
const Item = List.Item;
const Brief = Item.Brief;
export default class TaskPlaceComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ok: false,
            placeList:null
        }
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        var _this = this;
        $.ajax({type: 'get', url: https.api.place}).done((data) => {
            var json = JSON.parse(data);
            _this.setState({
                placeList:json.map((res,index) => {
                    return <Tag>{res.areaname}<i style={{display:"none"}}>{res.areaid}</i></Tag>
                })
            })
        })
    }

    cancel() {
        this.props.click();
    }

    submit(){
        var resultArr = [];
        var areaIdArr = [];
        $('.am-tag').each((index, res) => {
            if (res.className == 'am-tag am-tag-active') {
                resultArr.push(res)
                // choose area's id
                areaIdArr.push(res.childNodes[0].childNodes[3].innerText);
            }
        })
        if (resultArr.length >1 || areaIdArr.length>1) {
            alert('只能选择一个哦！')
        } else if (resultArr.length < 1 || areaIdArr.length<1) {
            alert('请选择一个分类')
        } else {
            console.log(resultArr[0].innerText, areaIdArr[0]);
            // this.props.click()
        }
    }

    render() {
        return (
            <div className="queue-demo">
                <QueueAnim className="demo-content" animConfig={[
                    {

                        translateY: [0, 50]
                    }, {
                        opacity: [
                            1, 0
                        ],
                        translateY: [0, 50]
                    }
                ]}>
                    {this.props.show
                        ? <div className="demo-thead" key="a" style={{overflow:'auto'}}>
                                <div className="place-head">按地区浏览
                                    <span onClick={this.cancel} style={{
                                        float:"right",
                                        paddingRight:'1rem',
                                        color:'#acacac'
                                    }} className="iconfont icon-dianyuan"></span>
                                </div>
                                <div className="place-list">
                                    <div className="place-list-top">
                                        {this.state.placeList}
                                    </div>
                                    <div className="place-list-bottom">
                                        <Button onClick={this.cancel} style={{
                                            background: '#80C632',
                                            borderColor: '#80C632',
                                            fontSize:'0.5rem'
                                        }} type="primary" inline={true}>取消</Button>
                                        <Button style={{
                                            background: '#F96506',
                                            borderColor: '#F96506',
                                            fontSize:'0.5rem'
                                        }} type="primary" onClick={this.submit} inline={true}>提交</Button>
                                    </div>
                                </div>
                            </div>
                        : null}
                </QueueAnim>
            </div>
        );
    }
}
