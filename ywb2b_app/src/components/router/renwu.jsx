import Header from './../public/Header';
import CarouselComponent from './../public/Carousel';
import FootComponent from './..//public/Foot';
import ScreenComponent from './../gaosou/screen';
import TaskPlaceComponent from './../task/place';
import {Flex, List, Tag} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import {IndexLink} from 'react-router';
import "./../../styles/task.less";
import PureRenderMixin from 'react-addons-pure-render-mixin';
const Item = List.Item;
const Brief = Item.Brief;

export default class RenwuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            tabs: [
                {
                    tabName: '剩余时间',
                    route:'timeDesc'
                }, {
                    tabName: '金额',
                    route:'moneyDesc'
                }, {
                    tabName: '稿件数',
                    route:'numDesc'
                }, {
                    tabName: '状态',
                    route:'statusDesc'
                }
            ]
        }; // default state
        this.changePlace = this.changePlace.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    changePlace() {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        let classname = this.state.show
            ? 'iconfont icon-jiantou0101'
            : 'iconfont icon-iconfontjiantou';
        var _this = this;
        var tabList = this.state.tabs.map(function(res, index) {
            return <IndexLink to={`/${res.route}`} activeClassName="task-active" >{res.tabName}
                <i className={classname} style={{
                    color: '#fbfbf8'
                }}></i></IndexLink>
        }.bind(_this));

        return (
            <div>
                <div className="wrap">
                    <CarouselComponent/>
                    <div className="task-head">
                        {tabList}
                        <div onClick={this.changePlace}>
                            地区
                            <i className={classname} style={{
                                color: '#56a9de'
                            }}></i>
                        </div>
                    </div>
                    {this.props.children}
                </div>
                <TaskPlaceComponent show={this.state.show} click={this.changePlace} index={this.state.currentIndex}/>
            </div>
        );
    }
}

RenwuComponent.contextTypes = {
    router: React.PropTypes.isRequired
}
