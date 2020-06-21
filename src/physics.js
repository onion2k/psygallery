import Matter from 'matter-js';
import { width, height } from './dimensions.js';

const Engine = Matter.Engine;
const World  = Matter.World;
const Bodies = Matter.Bodies;
const Runner = Matter.Runner;
const Events = Matter.Events;

const engine = Engine.create({
  width: width,
  height: height
});

const runner = Runner.create();

// const render = Matter.Render.create({
//   element: document.body,
//   engine: engine,
//   options: {
//     width,
//     height
//   }
// });

// Matter.Render.run(render);

const Physics = {
  init: (bodies) => {
    World.add(engine.world, Bodies.rectangle(width/2, height + 50, width * 4, 100, { isStatic: true }));
    Events.on(engine, 'afterUpdate',()=>{
      bodies.forEach((box)=>{
        box.ref.current.style.transform = `translate(${box.physics.position.x - box.offsetX}px, ${box.physics.position.y - box.offsetY}px) rotate(${box.physics.angle}rad)`;
      });
    })
  },
  run: () => { Runner.run(runner, engine); },
  start: () => { Runner.start(runner, engine); },
  stop: () => { Runner.stop(runner); },
  add: (bodies) => { World.add(engine.world, bodies); },
  on: (event, callback) => { Events.on(engine, event, callback); },
  Bodies: Bodies
}

export { Physics }