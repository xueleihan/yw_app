import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import FootComponent from './components/public/Foot';
import GaosouComponent from './components/router/index';
import RenwuComponent from './components/router/renwu';
import MallComponent from './components/router/mall';
import SupplyComponent from './components/router/supply';
import MessageComponent from './components/router/message';
import MeComponent from './components/router/me';
import UserComponent from './components/gaosou/users';
import AlbumComponent from './components/gaosou/album';
import AlbumDetailComponent from './components/gaosou/albumdetail';
import HoldTaskComponent from './components/gaosou/holdTask';
import ReleaseTaskComponent from './components/gaosou/releaseTask';
import UserliveComponent from './components/gaosou/userlive';
import ShopListComponent from './components/gaosou/shopList';
import ListDetailComponent from './components/gaosou/listDetail';
import ServerComponent from './components/gaosou/server';
import ConcatComponent from './components/gaosou/concat';
import PayComponent from './components/gaosou/pay';
import ShopcarComponent from './components/gaosou/shopcar';
import CartlistComponent from './components/gaosou/cartlist';
import MakeTaskComponent from './components/task/mkTask';
import TaskDescribeComponent from './components/task/taskDescribe';
import TaskResultComponent from './components/task/taskResult';
import TaskOrderComponent from './components/task/taskOrder';
import TaskDetailComponent from './components/task/taskDetail';
import TaskPayComponent from './components/task/taskPay';
import TaskPayResult from './components/task/taskPayResult';
import LoginComponent from './components/public/Login';
// task tab
import MoneyItemComponent from './components/task/moneyItem';
import TimeItemComponent from './components/task/timeItem';
import TasknumItemComponent from './components/task/tasknumItem';
import StateItemComponent from './components/task/taskstateItem';


export default class App extends React.Component {

    render() {
        return (
            <Router history={hashHistory}>
                <Route component={GaosouComponent} path="/">
                    <Route component={RenwuComponent} path="/renwu">
                        <IndexRoute component={MoneyItemComponent}/>
                        <Route component={MoneyItemComponent} path="/moneyDesc"></Route>
                        <Route component={TimeItemComponent} path="/timeDesc"></Route>
                        <Route component={TasknumItemComponent} path="/numDesc"></Route>
                        <Route component={StateItemComponent} path="/statusDesc"></Route>
                    </Route>
                    <Route component={LoginComponent} path="/login"></Route>
                    <Route component={MallComponent} path="/mall"></Route>
                    <Route component={SupplyComponent} path="/supply"></Route>
                    <Route component={MessageComponent} path="/message"></Route>
                    <Route component={MeComponent} path="/me"></Route><Route component={UserComponent} path="/users/:id"></Route>
                </Route>
                <Route component={AlbumComponent} path="/album/:id&:name"></Route>
                <Route component={AlbumDetailComponent} path="/detail/:name&:index"></Route>
                <Route component={HoldTaskComponent} path="/holdTask/:name"></Route>
                <Route component={ReleaseTaskComponent} path="/releaseTask/:name"></Route>
                <Route component={UserliveComponent} path="/live/:name"></Route>
                <Route component={ShopListComponent} path="/shopList/:name"></Route>
                <Route component={ListDetailComponent} path="/listDetail/:name"></Route>
                <Route component={ServerComponent} path="/server/:name"></Route>
                <Route component={ConcatComponent} path="/concat/:name"></Route>
                <Route component={PayComponent} path="/pay/:name"></Route>
                <Route component={ShopcarComponent} path="/shopcar/:name"></Route>
                <Route component={CartlistComponent} path="/cartlist"></Route>
                <Route component={MakeTaskComponent} path="/mkTask"></Route>
                <Route component={TaskDescribeComponent} path="/taskDescribe&:id"></Route>
                <Route component={TaskResultComponent} path="/taskResult&:id/:indus"></Route>
                <Route component={TaskOrderComponent} path="/taskOrder&:id"></Route>
                <Route component={TaskDetailComponent} path="/taskDetail&:id"></Route>
                <Route component={TaskPayComponent} path="/taskPay&:id"></Route>
                <Route component={TaskPayResult} path="/taskPayResult&:id"></Route>
            </Router>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('example'));
