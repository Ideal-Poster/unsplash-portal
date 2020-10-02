// const images = [];

class Image {
  // let spans = 0;
  constructor(obj, idx) {
    this.DOM = { el: null };
    this.container = null;
    this.idx = idx;
    this.obj = obj;

    // setTimeout(() => {

    this.init();
    // }, 2000);
  }

  init = () => {
    this.container = document.querySelector('#image__list');
    window.addEventListener('resize', () => {
      this.DOM.el.setAttribute('style', 'padding: 40px');
    });
  };

  render = () => {
    this.container.innerHTML += `
      <div class="grid-item search-result-${this.idx}">
        <img src="${this.obj.urls.regular}"/>
      </div>
    `;
    // save element to instance of image object
    this.DOM.el = document.querySelector(`.search-result-${this.idx}`);
  };

  // init()
  // return ({render})
}

export default Image;
