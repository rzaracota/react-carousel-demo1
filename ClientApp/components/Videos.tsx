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

    constructor(name: string, uri: string) {
        this.name = name;
        this.uri = uri;
    }
}

const slides = [ { name: "racoon", uri: "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F11fb3572-7380-11e7-8eac-856e9b33761e.jpg?crop=3000%2C1687%2C0%2C156" },
                 { name: "opossum", uri: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj_6PWc8YbbAhVS9GMKHalOA9UQjRx6BAgBEAU&url=http%3A%2F%2Fwww.havahart.com%2Fopossum-facts&psig=AOvVaw39tpl08UzjvGGaMLgEB7an&ust=1526445089053684" }] as Slide[];

class Videos extends React.Component<VideosProps, {}> {
    public renderSlide(slide: Slide, index: number,
        array: Slide[]) {
        return <div><h3>slide.name</h3><img src={slide.uri} alt={slide.name} /></div>;
    }

    public render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
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