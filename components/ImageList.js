import React, { useState, useEffect } from 'react';

import Image from './Image';
import ImagesLoaded from 'react-images-loaded';

function ImageList({ images, batchCount, isLoading, setIsLoading, setIsAnimamting, isButtonShown }) {
  const [isRevealed, setIsRevealed] = useState(false);
  // const [ isButtonShown, setIsButtonShown ] = useState(true);
  let batchIdx = 0;

  // useEffect(() =>{
  //   window.addEventListener('scroll')
  // }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const imagesElements = images.map((res, i) => {
    batchIdx <= batchCount ? (batchIdx += 1) : (batchIdx = 0);
    console.log(batchIdx);
    return (
      <Image
        isRevealed={isRevealed}
        key={i}
        src={res.urls.regular}
        idx={i}
        batchIdx={batchIdx}
        setIsLoading={setIsLoading}
      />
    );
  });

  return (
    <ImagesLoaded
      id="image__list"
      done={() => {
        setIsAnimamting(false);
        setIsRevealed(true);
        setIsLoading(false);
      }}
      background=".search-result"
    >
      {imagesElements}

      {isLoading && <div className="loader loading" />}

      {isButtonShown && (
        <div id="button" onClick={scrollToTop}>
          <div class="arrow left"></div>
        </div>
      )}
    </ImagesLoaded>
  );
}

export default ImageList;
