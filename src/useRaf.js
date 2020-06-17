import { useRef, useState, useLayoutEffect } from "react";

const useRaf = (
  callback,
  isActive
) => {
  const savedCallback = useRef();
  const [t, setT] = useState(0);
  // Remember the latest function.
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useLayoutEffect(()=>{
    setT(Date.now())
  }, [isActive])

  useLayoutEffect(() => {
    let animationFrame;

    function tick() {
      loop();
      savedCallback.current && savedCallback.current(Date.now() - t);
    }

    function loop() {
      animationFrame = requestAnimationFrame(tick);
    }

    if (isActive) {
      loop();
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [t, isActive]);
}

export default useRaf;