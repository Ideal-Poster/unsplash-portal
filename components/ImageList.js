import React, { useState } from 'react';

import Image from './Image';
import ImagesLoaded from 'react-images-loaded';
import Modal from './Modal';

function ImageList({ images, batchCount, isLoading, setIsLoading, setIsAnimamting }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let batchIdx = 0;

  const openModal = imageObj => {
    setSelectedImage(imageObj);
    setIsModalOpen(true);
  };

  const imagesElements = images.map((res, i) => {
    batchIdx <= batchCount ? (batchIdx += 1) : (batchIdx = 0);
    console.log(res);
    return (
      <Image
        isRevealed={isRevealed}
        key={i}
        imageObj={res}
        idx={i}
        batchIdx={batchIdx}
        setIsLoading={setIsLoading}
        openModal={openModal}
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

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} selectedImage={selectedImage} />
    </ImagesLoaded>
  );
}

export default ImageList;
