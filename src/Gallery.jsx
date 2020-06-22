import React, { useState, useEffect, useCallback } from 'react';
import { Physics } from "./lib/physics"
import { width, height } from './lib/dimensions'
import './App.css';

import Box from './components/Box';
import Pin from './components/Pin';

function Gallery({images}) {

  const [active, setActive] = useState(false);
  const [bodies, setBodies] = useState([]);
  const [pins, setPins] = useState([
    {x: width * 0.25, y: height * 0.6 },
    {x: width * 0.5, y: height * 0.5 },
    {x: width * 0.75, y: height * 0.6 }
  ]);

  const pictureSize = 200;
  const pinRadius = 20;

  useEffect(()=>{
    Physics.init(bodies);
    document.documentElement.style.setProperty('--pictureSize', `${pictureSize}px`);
    document.documentElement.style.setProperty('--pinSize', `${pinRadius * 2}px`);
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
        break;

      case "rect":
      default:
        box.physics = Physics.Bodies.rectangle(x, y, width, height, { isStatic: locked, frictionAir: 0.05 });
        break;
    }

    Physics.add(box.physics);
    tempBodies.push(box);
    setBodies(tempBodies);
  })

  const addPin = ((event)=>{
    setPins([
      ...pins,
      {
        x: event.clientX,
        y: event.clientY
      }
    ]);
  })

  const pinEls = pins.map((pin, i)=>{
    return (<Pin key={i} register={register} x={pin.x} y={pin.y} width={pinRadius} />)
  })

  return (
    <div className="Gallery" onClick={addPin}>
      {images.map((image, i)=>(<Box key={i} register={register} image={image} width={pictureSize} height={pictureSize} />))}
      { pinEls }
      <button
        onClick={()=>setActive(!active)}
      >Start/Stop</button>
    </div>
  );
}

export default Gallery;
