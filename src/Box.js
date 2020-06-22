import React, { useEffect, useRef } from 'react';
import { width } from './dimensions.js';

function Box({image, register}) {
  const ref = useRef();

  useEffect(()=>{
    register({
      shape: 'rect',
      x: Math.random() * width,
      y: Math.random() * 800,
      width: 180,
      height: 180,
      locked: false,
      ref
    });
  }, [])

  return (
    <div ref={ref} className="box" style={{ backgroundImage: `url('${ image }')` }}></div>
  )

}

export default Box;