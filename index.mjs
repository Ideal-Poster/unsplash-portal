import searchUnslpash from './api/requests';
import ImageList from './components/ImageList';

const gridContainer = document.querySelector('#image__list');
const imageList = new ImageList(gridContainer);

searchUnslpash('hello', 1, imageList.renderImages);
