// 'use strict';
import React, { useState, useEffect, useRef } from 'react';
import imagesLoaded from 'imagesloaded';

function Image() {
  let imageRef = useRef(null);
  useEffect(() => {
    imagesLoaded(imageRef, calcSpans);
  }, []);

  const [spans, setSpans] = useState(0);

  const calcSpans = () => {
    const height = imageRef.current.clientHeight;
    const spans = Math.ceil(height / 100 + 0.5);
    setSpans(spans);
  };

  return (
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <img
        ref={imageRef}
        // alt={description}
        src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
      />
    </div>
  );
}

export default Image;
