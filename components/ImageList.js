import ReactDOM from 'react-dom';
import React from 'react';
import LikeButton from './Image';

const e = React.createElement;

export default function ImageList(el) {
  let imageElements = [];
  let page = 1;
  const DOM = { el };

  function renderImages(res) {
    // reset images if new search
    if (page === 1) {
      imageElements = [];
      DOM.el.innerHTML = '';
    }

    const images = res.map(() => <LikeButton />);
    console.log(images);
    ReactDOM.render(images, el);
  }

  return { renderImages: renderImages };
}

// ReactDOM.render(e(Image), domContainer);
