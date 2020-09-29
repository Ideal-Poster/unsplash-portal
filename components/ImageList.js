let imageElements = [];
let page = 1;

export default function ImageList(el) {
  const DOM = { el };

  function renderImages(images) {
    // reset images if new search
    if (page === 1) {
      imageElements = [];
      DOM.el.innerHTML = '';
    }
    // add images to DOM
    images.map(image => {
      imageElements.push(image);
      DOM.el.innerHTML += `<p>poop</p>
        <img src="${image.urls.regular}"/>`;
    });
  }

  return { renderImages: renderImages };
}
