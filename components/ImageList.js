import React, { useState, useEffect } from 'react';

import Modal from './Modal';
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = imageObj => {
    setSelectedImage(imageObj);
    setIsModalOpen(true);
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
        imageObj={res}
        idx={i}
        batchIdx={batchIdx}
        setLoadedImages={setLoadedImages}
        latestResponse={latestResponse}
        areImagesLoaded={areImagesLoaded}
        openModal={openModal}
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
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} selectedImage={selectedImage} />
    </div>
  );
}

export default ImageList;
