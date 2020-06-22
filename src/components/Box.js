import React, { useState, useEffect, useRef } from 'react';
import { width } from '../lib/dimensions.js';

function Box({image, register, width, height}) {
  const ref = useRef();

  useEffect(()=>{
    register({
      shape: 'rect',
      x: Math.random() * width,
      y: Math.random() * 800,
      width,
      height,
      locked: false,
      ref
    });
  }, [])

  return (
    <div ref={ref} className="box" style={{ backgroundImage: `url('${ image }')` }}></div>
  )

}

export default Box;