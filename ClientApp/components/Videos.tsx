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

const slides = [ { key: "a", name: "racoon", uri: "/1.jpg" },
                 { key: "b", name: "opossum", uri: "/2.jpg" },
                 { key: "c", name: "rat", uri: "/3.jpg" } ] as Slide[];

class Videos extends React.Component<VideosProps, {}> {
    public renderSlide(slide: Slide, index: number,
        array: Slide[]) {
        return <div className="item" key={slide.key}><div className="row"><div className="col-md-4"><h3>{ slide.name }</h3></div></div>
        <div className="row"><div className="col-md-4"><img className="img-responsive" src={slide.uri} alt={slide.name} /></div></div></div>;
    }

    public render() {
        var settings = {
            dots: true,
            infinite: true,
            adaptiveHeight: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 5
          };

        const Slider = Slick.default;

        return <div>
            <h3>Videos</h3>
            <Slider {...settings}>
                { slides.map(this.renderSlide) }
            </Slider>
        </div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.videos, // Selects which state properties are merged into the component's props
    VideosStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Videos) as typeof Videos;