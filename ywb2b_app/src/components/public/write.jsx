import {Flex, Button, TextareaItem, List, Toast} from 'antd-mobile';
import {Link} from 'react-router';
import QueueAnim from 'rc-queue-anim';
import "./../../styles/foot.less";
import $ from "jquery";
import * as https from './../../apis/api.jsx';

const storage = window.localStorage;
var loginName = '';

export default class WriteComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cValue: ''
        };
        this.showArea = this.showArea.bind(this);
        this.submit = this.submit.bind(this);
    }
    showArea() {
        console.log(1);
        if (storage.getItem('username')) {
            console.log(this.state.show);
            this.setState({
                show: !this.state.show
            });
        } else {
            var href = this.context.router.location.pathname;
            storage.setItem('oldHref', href)
            this.context.router.replace('/login');
        }
    }

    componentDidMount() {
        loginName = storage.getItem('username');
        if (!loginName) {
            loginName = '';
        }
    }

    submit() {
        var that = this;
        if (this.state.cValue.length < 5) {
            Toast.fail('长度不能小于5', 1, () => {})
        } else {
            Toast.loading('正在发表...', 1, function() {
                $.ajax({
                    type: 'post',
                    async: false,
                    url: https.api.picComment,
                    data: {
                        item_username: that.props.itemName,
                        username: loginName,
                        item_id: that.props.itemId,
                        content: that.state.cValue
                    }
                }).done((data) => {
                    that.props.getData()
                });
                that.setState({
                    cValue:'',
                    show: !that.state.show
                });
            })
        }
    }

    render() {
        return (
            <div className="write" style={{
                backgroundColor: '#e5e5e5'
            }}>
                {/* <a href="javascript:;" className="write-btn" onClick={this.onClick.bind(this)}>写评论</a> */}
                <Button size='lg' style={{
                    width: '6rem',
                    height: '1.2rem',
                    borderRadius: '1rem',
                    backgroundColor: '#fff',
                    margin: '0.5rem 1.5rem 0.5rem 4.5rem',
                    textAlign: 'center',
                    lineHeight: '1.2rem',
                    fontSize: '0.6rem',
                    fontWeight: 'bold',
                    color: '#C2C2C2'
                }} onClick={this.showArea}>写评论</Button>
                <div className="queue-demo">
                    <QueueAnim className="demo-content" key="demo" type={['bottom']} ease={['easeOutQuart', 'easeInOutQuart']}>
                        {this.state.show
                            ? <div className="demo-thead" style={{
                                    height: '9rem',
                                    position: 'fixed',
                                    bottom: '0',
                                    right: '0',
                                    top: "initial",
                                    zIndex: '1'
                                }} key="a">
                                    <List>
                                        <TextareaItem rows="8" placeholder="请输入评论..." style={{
                                            width: '13.6rem',
                                            margin: '0.6rem',
                                            border: '1px solid #ccc',
                                            fontSize: "0.6rem"
                                        }} value={this.state.cValue} onChange={(e) => {
                                            this.setState({cValue: e})
                                        }}/>
                                        <Button size="large" style={{
                                            width: '3rem',
                                            height: '1.4rem',
                                            borderRadius: "0.3rem",
                                            backgroundColor: '#C2C2C2',
                                            lineHeight: '1.4rem',
                                            color: '#fff',
                                            float: 'right',
                                            margin: "-0.3rem 0.6rem 0 0",
                                            fontSize: '0.6rem'
                                        }} onClick={this.submit}>发表</Button>
                                    </List>
                                </div>
                            : null}
                    </QueueAnim>
                </div>
            </div>
        );
    }
}

WriteComponent.contextTypes = {
    router: React.PropTypes.isRequired
}
