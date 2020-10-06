import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

import Image from './Image';
import searchUnslpash from '../api/requests';

function ImageList() {
  // let imageElements = [];
  let page = 1;
  const [imageElements, setImageElements] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async page => {
    const response = await searchUnslpash('hello');
    setImageElements(current => [...current, ...response.results]);
  };

  const images = imageElements.map((res, i) => {
    console.log(res.id);
    return <Image src={res.urls.regular} idx={i} />;
  });

  return (
    <>
      {images}
      <div className="loader" />
    </>
  );
}

export default ImageList;
