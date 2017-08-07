import React from 'react';
import ReactDOM from 'react-dom';
import Header from './..//public/Header';
import CarouselComponent from './../public/Carousel';
import FootComponent from './..//public/Foot';
import ScreenComponent from './../gaosou/screen';

import './../../styles/index.less';

export default class MallComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="wrap">
                    <CarouselComponent/>
                    <div class="social-share" data-initialized="true">
                        <a href="#" class="social-share-icon icon-weibo"></a>
                        <a href="#" class="social-share-icon icon-qq"></a>
                        <a href="#" class="social-share-icon icon-qzone"></a>
                    </div>
                </div>
            </div>
        );
    }
}
