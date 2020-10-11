'use strict';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { debounce } from '../utils';

function Image({ src, idx, batchIdx, setLoadedImages, imageObj, areImagesLoaded, latestResponse, openModal }) {
  const [spans, setSpans] = useState(0);

  let imageRef = useRef(null);
  useEffect(() => {
    calcSpans();
    setResizeSpanListener();
    return removeResizeSpanListener;
  }, []);

  const isShown = () => {
    // if not loaded and not to be newly appended
    if (!areImagesLoaded && !latestResponse.includes(imageObj)) {
      return 'none';
      // if not loaded and is to be newly appended
    } else if (!areImagesLoaded && latestResponse.includes(imageObj)) {
      return 'hidden';
      // if loaded and is to be newly appended
    } else if (areImagesLoaded && latestResponse.includes(imageObj)) {
      return 'show';
    }
  };

  const calcSpans = () => {
    if (imageRef.current) {
      const height = imageRef.current.clientHeight;
      const spans = Math.ceil(height / 100 + 0.5);
      setSpans(spans);
    }
  };

  const setResizeSpanListener = () => {
    window.addEventListener('resize', debounce(calcSpans, 150));
  };

  const removeResizeSpanListener = () => {
    window.removeEventListener('resize', setSpans);
  };

  return (
    <motion.div
      style={{ gridRowEnd: `span ${spans}` }}
      className={`search-result search-result-${idx}`}
      variants={containerAnimation(batchIdx)}
      initial="hidden"
      animate={isShown()}
    >
      <motion.img
        ref={imageRef}
        variants={imgAnimation(batchIdx)}
        initial="hidden"
        animate={isShown()}
        onLoad={() => {
          calcSpans();
          setLoadedImages(current => [...current, imageObj]);
        }}
        // alt={description}
        src={imageObj.urls.regular}
        onClick={() => openModal(imageObj)}
      />
    </motion.div>
  );
}

function containerAnimation(idx) {
  return {
    hidden: {
      y: 400
    },
    show: {
      y: 0,
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.5 + idx * 0.05,
        delay: idx * 0.02
      }
    }
  };
}
function imgAnimation(idx) {
  return {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        ease: 'linear',
        duration: 0.25 + idx * 0.05
      }
    }
  };
}
export default Image;
