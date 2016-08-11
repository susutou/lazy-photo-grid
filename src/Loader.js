import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="loader-inner ball-pulse">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Loader;
