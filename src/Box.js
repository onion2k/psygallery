import React, { useEffect, useRef } from 'react';
import { width } from './dimensions.js';

function Box({register}) {
  const ref = useRef();

  useEffect(()=>{
    register({
      shape: 'rect',
      x: Math.random() * width,
      y: -200,
      width: 150,
      height: 150,
      locked: false,
      ref
    });
  }, [])

  return (
    <div ref={ref} className="box"></div>
  )

}

export default Box;