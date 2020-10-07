import React, { useState } from 'react';

import ImageList from './components/ImageList';
import searchUnslpash from './api/requests';

let currentSearch = null;

function App() {
  const [form, setForm] = useState('');
  const [images, setImages] = useState([]);

  const handleChange = e => {
    setForm(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    getImages(1);
  };

  const getImages = async page => {
    if (isFormValid()) {
      const response = await searchUnslpash(form, page);
      console.log(page);
      if (page === 1) {
        // console.log("1");
        setImages([]);
        setImages([...response.results]);
      } else {
        // console.log("2");
        setImages(current => [...current, ...response.results]);
      }
      currentSearch = form;
    }
  };

  const isFormValid = () => {
    return !(!form || form === currentSearch);
  };

  return (
    <>
      <div id="search">
        <div id="title__text">
          <h2 id="unsplash">unsplash</h2>
          <h2 id="search">search</h2>
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="search"
              onChange={handleChange}
              value={form}
              // onKeyDown={onKeyDown}
              id="search__form"
              placeholder="Search"
            />
          </form>
        </div>
      </div>
      <ImageList images={images} />
    </>
  );
}

export default App;
