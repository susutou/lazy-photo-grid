import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { randInt } from './utils';
import './index.css';

const SAMPLE_SIZE = 100;
const GAP_WIDTH = 10;
const MAX_ROW_HEIGHT = 400;

let rects = [];

for (let i = 0; i < SAMPLE_SIZE; i++) {
  let w;
  let h = 600;
  const c = randInt(0, 100);
  if (c >= 5) {
    w = randInt(800, 1000);
  } else {
    w = randInt(350, 450);
  }
  w += randInt(10, 20);
  rects.push({ w, h });
}

const containerHeight = window.innerHeight - 40;
const rowWidth = window.innerWidth - 40 * 2;

let row = [];
let currentWidth = 0;
let currentYOffset = 0;
let layouts = [];
let numRows = 0;

rects.forEach((r, i) => {
  const scaledH = MAX_ROW_HEIGHT;
  const scaledW = scaledH * (r.w / r.h);

  row.push({
    id: i,
    w: scaledW,
    h: scaledH
  });
  currentWidth += scaledW;

  // const actualRowWidth = currentWidth + (row.length - 1) * GAP_WIDTH;
  const gapTotalWidth = (row.length - 1) * GAP_WIDTH;

  if (currentWidth + gapTotalWidth >= rowWidth || i === rects.length - 1) {
    let scale;
    if (i === rects.length - 1 && row.length <= 1) {
      scale = MAX_ROW_HEIGHT / row[0].h;
    } else {
      scale = (rowWidth - gapTotalWidth) / currentWidth;
    }

    // console.log(scale);
    const rowHeight = MAX_ROW_HEIGHT * scale;
    let currentXOffset = 0;

    row.forEach((sr, j) => {
      const width = sr.w * scale;
      layouts.push({
        id: sr.id,
        row: numRows,
        w: width,
        h: rowHeight,
        left: currentXOffset,
        top: currentYOffset
      });
      currentXOffset += (width + GAP_WIDTH);
    });

    row = [];
    currentWidth = 0;
    currentYOffset += (rowHeight + GAP_WIDTH);
    numRows++;
  }
});

ReactDOM.render(
  <App layouts={layouts} width={rowWidth} height={containerHeight} />,
  document.getElementById('root')
);
