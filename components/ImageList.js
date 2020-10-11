import React, { useState, useEffect } from 'react';

import Image from './Image';

function ImageList({
  images,
  batchCount,
  isLoading,
  setIsLoading,
  isButtonShown,
  loadedImages,
  setLoadedImages,
  latestResponse
}) {
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);

  let batchIdx = 0;

  useEffect(() => {
    _areImagesLoaded();
  }, [loadedImages]);

  // are all images loaded and ready to be displayed?
  const _areImagesLoaded = () => {
    // are images for latest request loaded?
    const result = latestResponse.every(img => loadedImages.includes(img));
    if (result && !!loadedImages.length) {
      setAreImagesLoaded(result);
      setIsLoading(false);
    }
  };
  // Scroll button action
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const imagesElements = images.map((res, i) => {
    // new images appended have batch index for animation purposes
    batchIdx <= batchCount ? (batchIdx += 1) : (batchIdx = 0);
    return (
      <Image
        imageObj={res}
        key={i}
        src={res.urls.regular}
        idx={i}
        batchIdx={batchIdx}
        setLoadedImages={setLoadedImages}
        latestResponse={latestResponse}
        areImagesLoaded={areImagesLoaded}
      />
    );
  });

  return (
    <div id="image__list">
      {imagesElements}
      {isLoading && <div className="loader loading" />}
      {isButtonShown && (
        <div id="button" onClick={scrollToTop}>
          <div className="arrow left"></div>
        </div>
      )}
    </div>
  );
}

export default ImageList;
