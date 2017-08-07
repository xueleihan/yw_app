import {Carousel} from 'antd-mobile';

import "./../../styles/Carousel.less";

export default class CarouselComponent extends React.Component {

    state = {
        data: [
            'loading', 'loading'
        ],
        initialHeight: 164
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['banner_1', 'banner_1']
            });
        }, 200);
    }
    render() {
        const hProp = this.state.initialHeight
            ? {
                height: this.state.initialHeight
            }
            : {};
        return (
            <div>
                <Carousel className="my-carousel" autoplay={true} infinite selectedIndex={1} dots={false}>
                    {this.state.data.map(ii => (
                        <a href="javascript:;" key={ii} style={hProp} className="Carousel-a">
                            <img className="Carousel-img" src={`./src/images/${ii}.png`} onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize')); this.setState({ initialHeight: null, }); }}/>
                        </a>
                    ))}
                </Carousel>
            </div>
        );
    }
}
