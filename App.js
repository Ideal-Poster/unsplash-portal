import React, { useState, useEffect, useRef } from 'react';

import ImageList from './components/ImageList';
import searchUnslpash from './api/requests';

let currentSearch = null;
let page = 1;

function App() {
  const [form, setForm] = useState('');
  const [images, setImages] = useState([]);
  const [batchCount, setBatchCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonShown, setIsButtonShown] = useState(true);
  const [loadedImages, setLoadedImages] = useState([]);
  const [latestResponse, setLatestResponse] = useState([]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
  }, []);

  // reference state so it is availble to eventlisteners
  //=====================================================
  const imagesRef = useRef(images);
  const formRef = useRef(form);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    formRef.current = form;
  }, [form]);
  //=====================================================

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

  const scrollHandler = () => {
    addPageToResults();
    toggleScrollButton();
  };

  const toggleScrollButton = () => {
    window.pageYOffset > 400 ? setIsButtonShown(true) : setIsButtonShown(false);
  };

  const isFormValid = () => {
    return !!form || form !== currentSearch || !isAnimating;
  };

  const getImages = async page => {
    setIsLoading(true);
    const response = await searchUnslpash(formRef.current, page);
    if (page === 1) {
      setImages([]);
      setImages([...response.results]);
    } else {
      setImages(current => [...current, ...response.results]);
    }
    setBatchCount(response.results.length);
    setLatestResponse(response.results);
  };

  const shouldRequestPage = () => {
    return (
      // is user scrolled to bottom of page?
      document.documentElement.scrollHeight === window.pageYOffset + window.innerHeight &&
      // are images still in the proccess of being displayed on screen?
      !isLoading &&
      // are there photos to be displayed?
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
      <ImageList
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        images={images}
        batchCount={batchCount}
        isButtonShown={isButtonShown}
        loadedImages={loadedImages}
        setLoadedImages={setLoadedImages}
        latestResponse={latestResponse}
      />
    </>
  );
}

export default App;
