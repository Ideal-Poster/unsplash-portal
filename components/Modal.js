import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Modal({ selectedImage, isOpen, setIsOpen }) {
  return (
    <motion.div
      className="content__move"
      variants={contentMoveAnimation}
      initial="hidden"
      animate={isOpen ? 'show' : 'hidden'}
    >
      <motion.div
        className="content__reverse"
        variants={contentReverseAnimation}
        initial="hidden"
        animate={isOpen ? 'show' : 'hidden'}
      >
        <div>
          <button onClick={() => setIsOpen(false)} className="content__back" aria-label="Back to main view" />
          <div className="intro">
            {selectedImage && (
              <>
                <motion.img
                  id="modal-image"
                  src={selectedImage.urls.regular}
                  alt="woot"
                  variants={imageAnimation}
                  initial="hidden"
                  animate={isOpen ? 'show' : 'hidden'}
                />
                <p className="intro__desc">{selectedImage.description}</p>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const contentMoveAnimation = {
  hidden: {
    x: 0,
    transition: {
      ease: [0.87, 0, 0.13, 1],
      duration: 1
    }
  },
  show: {
    x: '-100%',
    transition: {
      ease: [0.87, 0, 0.13, 1],
      duration: 1
    }
  }
};

const contentReverseAnimation = {
  hidden: {
    x: 0,
    transition: {
      ease: [0.87, 0, 0.13, 1],
      duration: 1
    }
  },
  show: {
    x: '100%',
    transition: {
      ease: [0.87, 0, 0.13, 1],
      duration: 1
    }
  }
};

const imageAnimation = {
  hidden: {
    x: 50,
    opacity: 0,
    transition: {
      ease: [0.87, 0, 0.13, 1],
      duration: 1
    }
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      ease: [0.87, 0, 0.13, 1],
      duration: 1
    }
  }
};

export default Modal;
