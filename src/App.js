import React, { Component } from 'react';
import './App.css';

import UnsplashPhoto from './UsplashPhoto';

import { binarySearch } from './utils';

class App extends Component {
  state = {
    scrollTop: 0
  };

  scrollHandler = (event) => {
    // console.log(event.target.scrollTop);
    this.setState({ scrollTop: event.target.scrollTop });
  };

  render() {
    const { layouts, width, height } = this.props;
    const { scrollTop } = this.state;

    const lastItem = layouts[layouts.length - 1];
    const totalHeight = lastItem.top + lastItem.h;

    const containerStyle = {
      height: height,
      width: width,
      overflowX: 'hidden',
      overflowY: 'scroll',
      WebkitOverflowScrolling: 'touch'
    };

    const innerStyle = {
      height: totalHeight
    };

    // const topGradientStyle = {
    //   position: 'fixed',
    //   top: 40,
    //   height: 100,
    //   width: '100%',
    //   zIndex: 1,
    //   background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0))'
    // };
    //
    // const bottomGradientStyle = {
    //   position: 'fixed',
    //   bottom: 0,
    //   height: 100,
    //   width: '100%',
    //   zIndex: 1,
    //   background: 'linear-gradient(to top, #fff, rgba(255,255,255,0))'
    // };

    let startIndex = binarySearch(layouts, scrollTop, (layout, key) => layout.top - key);
    let endIndex = binarySearch(layouts, scrollTop + height, (layout, key) => layout.top + layout.h - key);

    // padding for startIndex
    while (startIndex > 0 && layouts[startIndex].top > scrollTop) {
      startIndex--;
    }
    const startItem = layouts[startIndex];
    while (startIndex >= 0 && layouts[startIndex].row === startItem.row) {
      startIndex--;
    }

    // padding for endIndex
    while (endIndex < layouts.length - 1 && layouts[endIndex].top + layouts[endIndex].h < scrollTop + height) {
      endIndex++;
    }
    const endItem = layouts[endIndex];
    while (endIndex < layouts.length && layouts[endIndex].row === endItem.row) {
      endIndex++;
    }

    return (
      <div className="App" style={containerStyle} onScroll={this.scrollHandler}>
        {/*{scrollTop > 100 && <div style={topGradientStyle}></div>}*/}
        <div style={innerStyle}>
          {layouts.slice(Math.max(0, startIndex + 1), endIndex + 10).map((r, i) => {
            const style = {
              width: r.w,
              height: r.h,
              backgroundColor: '#f5f5f5',
              position: 'absolute',
              left: r.left,
              top: r.top,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            };
            const w = Math.floor(r.w);
            const h = Math.floor(r.h);
            return <div style={style} key={r.id}><UnsplashPhoto width={w} height={h} alt={`Random ${r.id}`} /></div>;
          })}
        </div>
      </div>
    );

    // return (
    //   <div className="App" style={containerStyle}>
    //     {/*{scrollTop > 100 && <div style={topGradientStyle}></div>}*/}
    //     <div style={innerStyle}>
    //       {layouts.map((r, i) => {
    //         const style = {
    //           width: r.w,
    //           height: r.h,
    //           backgroundColor: '#f5f5f5',
    //           position: 'absolute',
    //           left: r.left,
    //           top: r.top,
    //           display: 'flex',
    //           justifyContent: 'center',
    //           alignItems: 'center'
    //         };
    //         const w = Math.floor(r.w);
    //         const h = Math.floor(r.h);
    //         return <div style={style} key={r.id}><img src={`https://source.unsplash.com/random/${w}x${h}`} alt={`Random ${r.id}`} /></div>;
    //       })}
    //     </div>
    //   </div>
    // );
  }
}

export default App;
