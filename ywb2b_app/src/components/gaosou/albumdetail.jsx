import {List, Popover, NavBar, Icon, Card} from 'antd-mobile';
import $ from "jquery";
import WriteComponent from './../public/write';
import * as https from './../../apis/api.jsx';

const Item = List.Item;
const Brief = Item.Brief;
var itemid = null,itemName = null,picArr = '',picItem = null,imgsrc = null,bannerItem = null,onOff = false,data = null,imgArr = [];
var indeex = 0;

export default class Albumsort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selected: '',
            imgArr:[1]
        }
        this.back = this.back.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }
    back = () =>  {
        window.history.back();
    }
    onSelect = (opt) => {
        this.setState({visible: false, selected: opt.props.value});
        console.log(opt);
    };
    handleVisibleChange = (visible) => {
        this.setState({visible});
    };

    componentDidMount () {
        var _this = this;
        this.getData()
    }

    componentWillMount(){
        itemid = this.props.params.name.split("&")[1];
        itemName = this.props.params.name.split("&")[0];
        indeex = this.props.params.index;
        imgArr = [];
        $.ajax({"type":'get',async:false,url:https.api.pictureSon}).done((data) => {
            data.map((res,index) => {
                if(res.itemid == itemid){
                    picArr = res.title;
                    imgArr.push(res)
                }
            })
        });
    }

    getData(){
        $.ajax({"type":'get',async:false,url:https.api.albumDetailPic}).done((data) => {
            picItem = data;
        });
        this.setState({
            imgitems:picItem.map((res,index) => {
                if(res.item_id == itemid){
                    switch (res.star) {
                        case 0:
                            imgsrc = "./src/images/star1.gif"
                            break;
                        case 1:
                            imgsrc = "./src/images/star1.gif"
                            break;
                        case 2:
                            imgsrc = "./src/images/star2.gif"
                            break;
                        case 3:
                            imgsrc = "./src/images/star3.gif"
                            break;
                    }
                    return <div className="album-comment" key={index}>
                        <img src={res.avatarpic} className="comment-pic"/>
                        <div className="comment-center">
                            <Brief><span>{res.comUsername}</span> 于 {res.addtime} <span>评论道:</span></Brief>
                            <Brief>{res.content}</Brief>
                            <Brief><img src={imgsrc}/></Brief>
                        </div>
                        <div className="comment-right">
                            支持1
                        </div>
                    </div>
                }
            })
        });
    }

    render() {
        let offsetX = -10;
        let offsetY = -10;
        return (
            <div>
                <NavBar className="nav-top" leftContent={<Icon type="left" size="lg" />} iconName={false} style={{backgroundColor:"#F29926",color:'#fff'}} mode="light" onLeftClick={this.back.bind(this)} rightContent={
                  <Popover mask
                    visible={this.state.visible}
                    overlay={[
                      (<Item key="4" value="scan"  style={{padding:'0.2rem 1.35rem',fontSize: '0.56rem',color: '#000'}} data-seed="logId">关注</Item>),
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
                  {itemName}
                </NavBar>
                <div className="content" style={{boxSizing:'border-box',paddingBottom:'0.5rem'}}>
                    <h2 className="detail-h2">{picArr||"暂未填写"}</h2>
                    <img src={imgArr[indeex].thumb}  style={{border:'1px solid #ccc'}} className="detail-pic"/>
                    {this.state.imgitems}
                </div>
                <WriteComponent itemName={itemName} itemId={itemid} getData={this.getData.bind(this)}/>
            </div>
        );
    }

}
