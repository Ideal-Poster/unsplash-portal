// 'use strict';
import React, { useState, useEffect, useRef } from 'react';
import imagesLoaded from 'imagesloaded';
import { debounce } from '../utils';

function Image({ src, idx }) {
  let imageRef = useRef(null);
  useEffect(() => {
    imagesLoaded(imageRef, calcSpans);
    setResizeSpanListener();
    return removeResizeSpanListener;
  }, []);

  const [spans, setSpans] = useState(0);

  const calcSpans = () => {
    const height = imageRef.current.clientHeight;
    console.log(height);
    const spans = Math.ceil(height / 100 + 0.5);
    setSpans(spans);
  };

  const setResizeSpanListener = () => {
    window.addEventListener('resize', debounce(calcSpans, 150));
  };

  const removeResizeSpanListener = () => {
    window.removeEventListener('resize', setSpans);
  };

  return (
    <div className={`search-result search-result-${idx}`} style={{ gridRowEnd: `span ${spans}` }}>
      <img
        ref={imageRef}
        // alt={description}
        src={src}
      />
    </div>
  );
}

export default Image;
