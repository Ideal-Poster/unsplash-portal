import React from 'react';

import Image from './Image';

function ImageList({ images }) {
  let page = 1;
  const imagesElements = images.map((res, i) => {
    return <Image key={i} src={res.urls.regular} idx={i} />;
  });

  return (
    <div id="image__list">
      {imagesElements}
      <div className="loader" />
    </div>
  );
}

export default ImageList;
