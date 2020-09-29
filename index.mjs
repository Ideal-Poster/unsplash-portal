import searchUnslpash from './api/requests';
import ImageList from './components/ImageList';

let page = 1;
let isAnimating = false;
let imageElements = [];

const imageList = new ImageList(document.querySelector('#image__list'));
// searchUnslpash('hello', page, imageList.renderImages);
