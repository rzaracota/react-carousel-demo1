import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as VideosStore from '../store/Videos';
import * as WeatherForecasts from '../store/WeatherForecasts';

import * as Slick from 'react-slick';

type VideosProps =
    VideosStore.VideosState
    & typeof VideosStore.actionCreators
    & RouteComponentProps<{}>;

class Slide {
    name: string;
    uri: string;
    key: string;

    constructor(name: string, uri: string) {
        this.name = name;
        this.uri = uri;
        this.key = uri + name;
    }
}

const slides = [ { key: "a", name: "racoon", uri: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjItJ2kqInbAhVQyWMKHaAyCOkQjRx6BAgBEAU&url=http%3A%2F%2Fwww.catster.com%2Fcat-behavior%2Fwhat-is-cat-flehmen-response&psig=AOvVaw2WJhjTi-YKAdkvI4Q9n9Z3&ust=1526528588794833" },
                 { key: "b", name: "opossum", uri: "https://www.argospetinsurance.co.uk/assets/uploads/2017/12/cat-pet-animal-domestic-104827.jpeg" },
                 { key: "c", name: "rat", uri: "https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg" } ] as Slide[];

class Videos extends React.Component<VideosProps, {}> {
    public renderSlide(slide: Slide, index: number,
        array: Slide[]) {
        /*return <div className="item" key={slide.key}><div className="row" key={slide.key}><div className="col-md-4" key={slide.key}><h3 key={slide.key}>{ slide.name }</h3></div></div>
        <div className="row" key={slide.key}><div className="col-md-4" key={slide.key}><img className="img-responsive" src={slide.uri} alt={slide.name} key={slide.key} /></div></div></div>;*/
        return <img src={ slide.uri } className="item col-md-6" key={ slide.key } alt={ slide.name } />;
    }

    public render() {
        var settings = {
            dots: true,
            infinite: true,
            variableWidth: true,
            adaptiveHeight: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };

        const Slider = Slick.default;

        return <div>
            <h3>Videos</h3>
            <div className="row">
                <div className="col col-md-6">
                    <Slider {...settings}>
                        { slides.map(this.renderSlide) }
                    </Slider>
                </div>
            </div>
        </div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.videos, // Selects which state properties are merged into the component's props
    VideosStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Videos) as typeof Videos;