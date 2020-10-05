import searchUnslpash from './api/requests';
import ImageList from './components/ImageList';

const animeOpts = {
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
};

const gridContainer = document.querySelector('#image__list');
const imageList = new ImageList(gridContainer);

searchUnslpash('hello', 1, imageList.renderImages);
