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
    // add images to DOM
    res.map((obj, idx) => {
      imageElements.push(obj);
      new Image(obj, idx).render();
    });
  }

  return { renderImages: renderImages };
}
