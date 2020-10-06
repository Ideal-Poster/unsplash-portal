import searchUnslpash from '../api/requests';
// import ImageList from './ImageList';

const gridContainer = document.querySelector('#image__list');
// const imageList = new ImageList(gridContainer);

function SearchBar(el) {
  el.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      // searchUnslpash(el.value, 1, imageList.renderImages);
    }
  });
}

export default SearchBar;
