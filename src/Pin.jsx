import React, { useEffect, useRef } from 'react';
import { width, height } from './dimensions.js';

function Pin({register}) {
  const ref = useRef();

  useEffect(()=>{
    register({
      shape: 'circle',
      x: Math.random() * width,
      y: Math.random() * height,
      width: 10,
      locked: true,
      ref
    });
  }, [])

  return (
    <div ref={ref} className="pin"></div>
  )

}

export default Pin;