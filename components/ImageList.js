import React, { useState } from 'react';

import Image from './Image';
import ImagesLoaded from 'react-images-loaded';

function ImageList({ images, batchCount, isLoading, setIsLoading, setIsAnimamting }) {
  const [isRevealed, setIsRevealed] = useState(false);

  let batchIdx = 0;

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
    </ImagesLoaded>
  );
}

export default ImageList;
