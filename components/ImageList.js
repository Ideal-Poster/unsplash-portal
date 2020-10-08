import React from 'react';

import Image from './Image';

function ImageList({ images, batchCount, isLoading, setIsLoading }) {
  let batchIdx = 0;

  const imagesElements = images.map((res, i) => {
    batchIdx <= batchCount ? (batchIdx += 1) : (batchIdx = 0);
    console.log(batchIdx);
    return <Image key={i} src={res.urls.regular} idx={i} batchIdx={batchIdx} setIsLoading={setIsLoading} />;
  });

  return (
    <div id="image__list">
      {imagesElements}

      {isLoading && <div className="loader loading" />}
    </div>
  );
}

export default ImageList;
