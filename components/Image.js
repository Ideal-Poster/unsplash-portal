// 'use strict';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const e = React.createElement;

function LikeButton() {
  let imageRef = React.useRef(null);
  useEffect(() => {
    //   imageRef = React.createRef(null);
    // console.log(imageRef);
    calcSpans();
  }, []);

  const [spans, setSpans] = useState(0);

  const calcSpans = () => {
    const height = imageRef.current.clientHeight;
    const spans = Math.ceil(height / 100 + 0.5);
    setSpans(spans);
    console.log(spans);
  };

  return (
    // e("img", {
    //   stlye: { gridRowEnd: `span ${spans}` },
    //   className: '',
    //   alt: 'hello',
    //   src: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    //   ref: imageRef
    // })
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <img
        // onClick={ () => this.modalClick(index) }
        // className={classTitles}
        ref={imageRef}
        // alt={description}
        src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
      />
    </div>
  );
}

export default LikeButton;
