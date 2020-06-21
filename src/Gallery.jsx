import React, { useState, useEffect, useCallback } from 'react';
import { Physics } from "./physics"
import './App.css';

import Box from './Box';
import Pin from './Pin';

function Gallery() {

  const [active, setActive] = useState(false);
  const [bodies, setBodies] = useState([]);

  useEffect(()=>{
    Physics.init(bodies);
  }, []);

  useEffect(() => {
    if (active) {
      Physics.start();
    } else {
      Physics.stop();
    }
  }, [active]);

  const register = useCallback(({shape, x, y, width, height=null, locked, ref})=>{
    const tempBodies = bodies;

    const box = {
      width,
      height,
      locked,
      ref,
    }

    switch (shape) {
      case "circle":
        box.physics = Physics.Bodies.circle(x, y, width, { isStatic: locked });
        box.offsetX = box.width;
        box.offsetY = box.width;
        break;

      case "rect":
      default:
        box.physics = Physics.Bodies.rectangle(x, y, width, height, { isStatic: locked });
        box.offsetX = box.width * 0.5;
        box.offsetY = box.height * 0.5;
        break;
    }

    Physics.add(box.physics);
    tempBodies.push(box);
    setBodies(tempBodies);
  })

  return (
    <div className="Gallery">
      {[...Array(5).keys()].map((key, i)=>(<Box key={i} register={register} />))}
      {[...Array(5).keys()].map((key, i)=>(<Pin key={i} register={register} />))}
      <button
        onClick={()=>setActive(!active)}
      >Start/Stop</button>
    </div>
  );
}

export default Gallery;
