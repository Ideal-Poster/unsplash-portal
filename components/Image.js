'use strict';
import React, { useState, useEffect, useRef } from 'react';
import ImagesLoaded from 'react-images-loaded';
import { motion } from 'framer-motion';

import { debounce } from '../utils';

function Image({ src, idx, batchIdx, setIsLoading }) {
  const [spans, setSpans] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  let imageRef = useRef(null);
  useEffect(() => {
    setResizeSpanListener();
    return removeResizeSpanListener;
  }, []);

  const calcSpans = () => {
    const height = imageRef.current.clientHeight;
    const spans = Math.ceil(height / 100 + 0.5);
    setSpans(spans);
  };

  const setResizeSpanListener = () => {
    window.addEventListener('resize', debounce(calcSpans, 150));
  };

  const removeResizeSpanListener = () => {
    window.removeEventListener('resize', setSpans);
  };

  const imageLoaded = () => {
    setIsLoading(false);
    setIsRevealed(true);
  };

  return (
    <motion.div
      style={{ gridRowEnd: `span ${spans}` }}
      className={`search-result search-result-${idx}`}
      variants={containerAnimation(batchIdx)}
      initial="hidden"
      animate={isRevealed ? 'show' : 'hidden'}
    >
      <ImagesLoaded onAlways={calcSpans} done={() => imageLoaded()}>
        <motion.img
          ref={imageRef}
          variants={imgAnimation(batchIdx)}
          initial="hidden"
          animate={isRevealed ? 'show' : 'hidden'}
          // alt={description}
          src={src}
        />
      </ImagesLoaded>
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
