import React, { useState, useEffect, useRef } from 'react';

function Pin({register, x, y, width}) {
  const ref = useRef();

  useEffect(()=>{
    register({
      shape: 'circle',
      x,
      y,
      width,
      locked: true,
      ref
    });
  }, [])

  return (
    <div ref={ref} className="pin"></div>
  )

}

export default Pin;