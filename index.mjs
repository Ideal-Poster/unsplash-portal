import anime from 'animejs';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';
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

// const grid = document.querySelector('#grid');
// const body = document.body;
// var elem = document.querySelector('.grid');

// imagesLoaded(body, function() {
//   new Masonry(elem, {
//     itemSelector: '.grid__item',
//     columnWidth: '.grid__sizer',
//     percentPosition: true,
//     transitionDuration: 0
//   });
// })

const gridContainer = document.querySelector('#image__list');
const imageList = new ImageList(gridContainer);

// anime(animeOpts)
searchUnslpash('hello', 1, imageList.renderImages);

// console.log(ImageList.);

// let test = document.querySelector('#image__list');
// window.addEventListener('resize', () => { test.style.height = '500px' } )
