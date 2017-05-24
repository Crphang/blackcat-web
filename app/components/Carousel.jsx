import React from 'react';

import Constants from '../Constants';
import '../styles/Carousel.scss';

class Carousel extends React.Component {

  constructor() {
    super();
    this.state = {
      selected: 0,
    };

    this.handleRightChangeImage = this.handleRightChangeImage.bind(this);
  }

  handleRightChangeImage() {
    let selected = this.state.selected;

    selected = (selected + 1) % this.props.images.length;
    this.setState({
      selected,
    });
  }

  render() {
    if (this.props.images && this.props.images !== undefined && this.props.images.length > 0) {
      const selectedImage = this.props.images[this.state.selected];
      return (
        <div className="carousel">
          <img id="carouselImage" className="active" src={Constants.IMAGES + selectedImage} />
          {this.props.images.map(image => image !== selectedImage &&
              <img id="carouselImage" src={Constants.IMAGES + image} />)}
          <div className="rightButton">
            <img className="button" onClick={() => this.handleRightChangeImage()} src={Constants.STATIC + '/assets/date-from.svg'} />
          </div>
        </div>
      );
    }

    return (
      <div />
    );
  }
}

export default Carousel;
