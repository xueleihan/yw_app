import {List, ListView} from 'antd-mobile';
import "./../../styles/item.less";
import * as https from './../../apis/api.jsx';
import $ from "jquery";
import Grid from './totalGrid'
import {Link} from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;
var data = null;
$.ajax({type: 'get', async: false, url: https.api.masterTotal}).done(function(res) {
    data = res;
})
let index = 0;
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;
export default class Totalsort extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        index = 0;

        this.dataBlob = {};
        this.sectionIDs = [];
        this.rowIDs = [];
        this.genData = (pIndex = 0) => {
            for (let i = 0; i < NUM_SECTIONS; i++) {
                const ii = (pIndex * NUM_SECTIONS) + i;
                const sectionName = `Section ${ii}`;
                this.sectionIDs.push(sectionName);
                this.dataBlob[sectionName] = sectionName;
                this.rowIDs[ii] = [];

                for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
                    const rowName = `S${ii}, R${jj}`;
                    this.rowIDs[ii].push(rowName);
                    this.dataBlob[rowName] = rowName;
                }
            }
            this.sectionIDs = [].concat(this.sectionIDs);
            this.rowIDs = [].concat(this.rowIDs);
        };

        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: true,
            onOff: this.props.onOff
        };
    }
    goUser(href) {
        this.context.router.push(href);
    }

    componentDidMount() {
        index = 0
        setTimeout(() => {
            this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
                isLoading: false
            });
        }, 600);
    }

    onEndReached = (event) => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(() => {
            this.setState({isLoading: false});
        }, 1000);
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            if (index > data.length - 1) {
                index = 0;
            }
            const obj = data[index++];
            return (
                <Item arrow="empty" onClick={this.goUser.bind(this, `users/${obj.username}`)}>
                    <div className="Item-left">
                        <a href="javascript:;">
                            <img src={obj.avatarpic}/>
                        </a>
                    </div>
                    <div className="Item-right">
                        <Brief style={{
                            fontSize: '0.55rem',
                            color: "#464646",
                            width: '100%'
                        }}>{obj.username}<img src={obj.buyer_level} className="Brief-img"/>
                            <span style={{
                                paddingRight: '0.6rem'
                            }}>最近3月成交：<em>{obj.total_sales}</em>
                            </span>
                        </Brief>
                        <Brief style={{
                            fontSize: '0.55rem',
                            color: "#464646",
                            width: "100%"
                        }}>好评率：<em>{obj.pre}</em>
                            <span style={{
                                float: "right",
                                paddingRight: '0.6rem'
                            }}>{obj.areaid}</span>
                        </Brief>
                        <Brief style={{
                            width: '100%',
                            fontSize: '0.55rem',
                            color: "#464646"
                        }}>主营：{obj.business
                                ? obj.business
                                : "暂未填写"}</Brief>
                    </div>
                </Item>
            );
        };

        return (
            <div>{this.props.onOff
                    ? <ListView removeClippedSubviews={true} initialListSize={10} dataSource={this.state.dataSource} renderFooter={() => <div style={{
                            textAlign: 'center',
                            fontSize: '0.6rem'
                        }}>
                            {this.state.isLoading
                                ? '加载中...'
                                : '加载完毕'}
                        </div>} renderRow={row} className="fortest" style={{
                            height: '18rem',
                            overflow: 'auto'
                        }} pageSize={1} scrollRenderAheadDistance={10} scrollEventThrottle={1} onEndReached={this.onEndReached} onEndReachedThreshold={100}/>
                    : <Grid/>}
            </div>
        );
    }
}

Totalsort.contextTypes = {
    router: React.PropTypes.isRequired
}
