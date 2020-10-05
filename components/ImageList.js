import ReactDOM from 'react-dom';
import React from 'react';
import Image from './Image';

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

    const images = res.map(obj => <Image key={obj.id} />);
    ReactDOM.render(images, el);
  }

  return { renderImages: renderImages };
}

// ReactDOM.render(e(Image), domContainer);
