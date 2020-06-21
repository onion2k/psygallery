import { useRef, useState, useLayoutEffect } from "react";

const useRaf = (
  callback,
  isActive
) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useLayoutEffect(() => {
    let animationFrame;

    function tick(time) {
      loop();
      savedCallback.current && savedCallback.current(time);
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
  }, [isActive]);
}

export default useRaf;