import React, { Component } from 'react';

import Loader from './Loader';

class UnsplashPhoto extends Component {
  state = {
    isLoaded: false
  };

  handleOnLoad = (event) => {
    this.setState({ isLoaded: true });
  };

  render() {
    const { width, height, alt } = this.props;
    const { isLoaded } = this.state;

    const imgStyle = {
      display: isLoaded ? 'block' : 'none'
    };

    let fetchWidth = width;
    let fetchHeight = height;

    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
      fetchWidth *= 2;
      fetchHeight *= 2;
    }

    return (
      <div>
        <img style={imgStyle}
             width={width}
             height={height}
             src={`https://source.unsplash.com/random/${fetchWidth}x${fetchHeight}`}
             alt={alt}
             onLoad={this.handleOnLoad} />
        {isLoaded ? null : <Loader />}
      </div>
    );
  }
}

export default UnsplashPhoto;
