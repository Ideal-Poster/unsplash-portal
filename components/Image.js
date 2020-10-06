'use strict';
import React, { useState, useEffect, useRef } from 'react';
import imagesLoaded from 'imagesloaded';
import { motion } from 'framer-motion';

import { debounce } from '../utils';

function Image({ src, idx }) {
  let imageRef = useRef(null);
  useEffect(() => {
    imagesLoaded(imageRef.current, calcSpans);
    setResizeSpanListener();
    return removeResizeSpanListener;
  }, []);

  const [spans, setSpans] = useState(0);

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

  return (
    <motion.div
      style={{ gridRowEnd: `span ${spans}` }}
      className={`search-result search-result-${idx}`}
      variants={containerAnimation(idx)}
      initial="hidden"
      animate="show"
    >
      <motion.img
        ref={imageRef}
        variants={imgAnimation(idx)}
        initial="hidden"
        animate="show"
        // alt={description}
        src={src}
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
