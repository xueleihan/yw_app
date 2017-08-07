import React from 'react';
import ReactDOM from 'react-dom';
import Header from './..//public/Header';
import CarouselComponent from './..//public/Carousel';
import FootComponent from './..//public/Foot';
import ItemComponent from './..//gaosou/Item';
import ScreenComponent from './..//gaosou/screen';
import PureRenderMixin from 'react-addons-pure-render-mixin';
const $ = require('jquery');

import './../../styles/index.less';

export default class GaosouComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        var _this = this;
        window.addEventListener('resize', function() {
            document.body.clientHeight <= 400
                ? _this.setState({show: false})
                : _this.setState({show: true});
        }, false);
    }

    render() {

        return (
            <div>
                <Header/>
                <div className="wrap" style={{overflow:'hidden'}}>
                    <CarouselComponent/>
                    <ItemComponent/>
                </div>
                {this.props.children}
                {this.state.show
                    ? <FootComponent/>
                    : null}
            </div>
        );
    }
}
