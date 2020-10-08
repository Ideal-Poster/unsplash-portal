import React from 'react';

import Image from './Image';

function ImageList({ images, batchCount }) {
  let batchIdx = 0;
  const imagesElements = images.map((res, i) => {
    batchIdx <= batchCount ? (batchIdx += 1) : (batchIdx = 0);
    console.log(batchIdx);
    return <Image key={i} src={res.urls.regular} idx={i} batchIdx={batchIdx} />;
  });

  return (
    <div id="image__list">
      {imagesElements}
      <div className="loader" />
    </div>
  );
}

export default ImageList;
