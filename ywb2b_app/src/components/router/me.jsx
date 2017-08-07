import React from 'react';
import ReactDOM from 'react-dom';
import Header from './..//public/Header';
import CarouselComponent from './../public/Carousel';
import FootComponent from './..//public/Foot';
import ScreenComponent from './../gaosou/screen';

import './../../styles/index.less';

export default class MeComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="wrap">
                    <CarouselComponent/>
                    <h1>我</h1>
                </div>
            </div>
        );
    }
}
