import React, { useState, useEffect, useRef, useCallback } from 'react';
import { width, height } from './dimensions.js';
import { Physics } from "./physics"
import './App.css';

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

function App() {

  const [active, setActive] = useState(false);
  const [bodies, setBodies] = useState([]);

  useEffect(()=>{
    Physics.add(Physics.Bodies.rectangle(width/2, height + 50, width, 100, { isStatic: true })); // ground
    Physics.on('afterUpdate',()=>{
      bodies.forEach((box)=>{
        box.ref.current.style.transform = `translate(${box.physics.position.x - box.offsetX}px, ${box.physics.position.y - box.offsetY}px) rotate(${box.physics.angle}rad)`;
      });
    })
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
    <div className="App">
      <Box register={register} />
      <Box register={register} />
      <Box register={register} />
      <Box register={register} />
      <Box register={register} />
      {[...Array(5).keys()].map((key, i)=>(<Pin key={i} register={register} />))}
      <button
        onClick={()=>setActive(!active)}
      >Start/Stop</button>
    </div>
  );
}

export default App;
