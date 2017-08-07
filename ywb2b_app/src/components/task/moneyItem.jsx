import React, {PropTypes} from 'react';
import {Flex, List, RefreshControl, ListView, Icon, Toast} from 'antd-mobile';
import {Link} from 'react-router';
import * as https from './../../apis/api.jsx';
const $ = require('jquery');
const Item = List.Item;
const Brief = Item.Brief;
var data = null,
    obj = null;
let index = 0;
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;
export default class MoneyItemComponent extends React.Component {
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
            onOff: this.props.onOff,
            refreshing: false
        };
    }

    onRefresh = () => {
        if (!this.manuallyRefresh) {
            this.setState({refreshing: true});
        } else {
            this.manuallyRefresh = false;
        }
        setTimeout(() => {
            this.setState({refreshing: false});
            $.ajax({
                type: 'get',
                async: false,
                url: https.api.tasklistDescMoney
            }).done(function(res) {
                obj = res;
            })
            this.setState({dataList: obj})
        }, 1000);
    };

    goDetail(id){
        this.context.router.push(`/taskDetail&${id}`);
    }

    componentDidMount() {
        index = 0;
        this.manuallyRefresh = true;

            $.ajax({
                type: 'get',
                async: false,
                url: https.api.tasklistDescMoney
            }).done(function(res) {
                data = res;
            })
            this.setState({dataList: data})
        setTimeout(() => {
            this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
                isLoading: false,
                refreshing: true
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
            if (index > this.state.dataList.length - 1) {
                index = 0;
            }
            const obj = this.state.dataList[index++];
            var status = '';
            if (obj.task_status === 0) {
                status = '未付款'
            } else if (obj.task_status === 1) {
                status = '待审核'
            } else if (obj.task_status === 2) {
                status = '投稿中'
            } else if (obj.task_status === 3) {
                status = '选稿中'
            } else if (obj.task_status === 4) {
                status = '投票中'
            } else if (obj.task_status === 5) {
                status = '公示中'
            } else if (obj.task_status === 6) {
                status = '交付中'
            } else if (obj.task_status === 7) {
                status = '冻结中'
            } else if (obj.task_status === 8) {
                status = '结束'
            } else if (obj.task_status === 9) {
                status = '失败'
            } else if (obj.task_status === 10) {
                status = '审核失败'
            } else if (obj.task_status === 11) {
                status = '仲裁中'
            } else if (obj.task_status === 'p2') {
                status = '投标中'
            } else if (obj.task_status === 'd2') {
                status = '竞标中'
            } else if (obj.task_status === 13) {
                status = '交付冻结'
            }
            return (<Item className="task-item" arrow="empty" style={{
                        overflow: 'hidden'
                    }} multipleLine onClick={this.goDetail.bind(this,obj.task_id)}>
                        <Brief>
                            <b style={{
                                width: '10rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>{obj.task_title}</b>
                            <span>{obj.area}</span>
                        </Brief>
                        <Brief style={{
                            color: '#464646',
                            fontSize: '0.45rem'
                        }}>
                            <div style={{
                                width: '4.8rem',
                                textAlign: 'left',
                                float: "left"
                            }}>赏金:<span style={{
                    color: 'red'
                }}>￥{obj.task_cash}</span>
                            </div>
                            <div style={{
                                width: '3rem',
                                float: "left"
                            }}>{obj.model_id == 1
                                    ? '单人悬赏'
                                    : '多人悬赏'}</div>
                            <div style={{
                                width: '3.1rem',
                                float: "left"
                            }}>
                                稿件数:{obj.work_num
                                    ? obj.work_num
                                    : 0}
                            </div>
                            <div style={{
                                width: '3rem',
                                float: "right",
                                textAlign:'right'
                            }}>状态:{status}</div>
                        </Brief>
                        <Brief style={{
                            color: '#464646',
                            fontSize: '0.5rem'
                        }}>
                            {obj.task_desc}
                        </Brief>
                    </Item>
            );
        };

        return (<ListView removeClippedSubviews={true} initialListSize={10} dataSource={this.state.dataSource} renderFooter={() => <div style={{
                textAlign: 'center',
                fontSize: '0.6rem'
            }}>
                {this.state.isLoading
                    ? '加载中...'
                    : '加载完毕'}
            </div>} renderRow={row} className="fortest" style={{
                height: '18rem',
                overflow: 'auto'
            }} pageSize={1} scrollRenderAheadDistance={10} scrollEventThrottle={1} onEndReached={this.onEndReached} onEndReachedThreshold={100} refreshControl={<RefreshControl refreshing = {
                this.state.refreshing
            }
            onRefresh = {
                this.onRefresh
            }
            loading = { <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}><Icon type = 'loading' size = 'lg' /><span style={{fontSize:'0.5rem',marginLeft:'0.2rem'}}>正在刷新...</span></div>
            } />}/>
        );
    }
}

MoneyItemComponent.contextTypes = {
    router: React.PropTypes.isRequired
}
