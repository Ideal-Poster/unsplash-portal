import ReactDOM from 'react-dom';
import React from 'react';
import anime from 'animejs';

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

    const images = res.map((obj, idx) => {
      return <Image idx={idx} src={obj.urls.regular} key={obj.id} />;
    });
    ReactDOM.render(images, el);
    setTimeout(() => revealImages(), 1000);
  }

  function revealImages() {
    const searchResults = Array.from(el.querySelectorAll('.search-result'));
    const newResults = searchResults.slice(-20, searchResults.length);
    // newResults.map(element => imageElements.push(element));

    anime({
      targets: newResults,
      duration: function(t, i) {
        return 500 + i * 50;
      },
      easing: 'easeOutExpo',
      delay: function(t, i) {
        return i * 20;
      },
      opacity: {
        value: [0, 1],
        duration: function(t, i) {
          return 250 + i * 50;
        },
        easing: 'linear'
      },
      translateY: [400, 0]
    });
  }

  return { renderImages };
}
