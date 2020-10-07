import React, { useState, useEffect, useRef } from 'react';

import ImageList from './components/ImageList';
import searchUnslpash from './api/requests';

let currentSearch = null;
let page = 1;
let isAnimating = false;

function App() {
  const [form, setForm] = useState('');
  const [images, setImages] = useState([]);
  const [batchCount, setBatchCount] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', addPageToResults);
  }, []);

  // reference state so it is availble to eventlisteners
  const imagesRef = useRef(images);
  const formRef = useRef(form);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    formRef.current = form;
  }, [form]);
  //  ========================

  const handleChange = e => {
    setForm(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (isFormValid()) {
      getImages(1);
      currentSearch = form;
    }
  };

  const isFormValid = () => {
    return !(!form || form === currentSearch);
  };

  const getImages = async page => {
    const response = await searchUnslpash(formRef.current, page);
    console.log(response);
    if (page === 1) {
      await setImages([]);
      setImages([...response.results]);
    } else {
      console.log(response);
      setImages(current => [...current, ...response.results]);
    }
    setBatchCount(response.results.length);
  };

  const shouldRequestPage = () => {
    return (
      document.documentElement.scrollHeight === window.pageYOffset + window.innerHeight &&
      !isAnimating &&
      imagesRef.current.length > 0
    );
  };

  const addPageToResults = () => {
    if (shouldRequestPage()) {
      page += 1;
      getImages(page);
    }
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
              id="search__form"
              placeholder="Search"
            />
          </form>
        </div>
      </div>
      <ImageList images={images} batchCount={batchCount} />
    </>
  );
}

export default App;
