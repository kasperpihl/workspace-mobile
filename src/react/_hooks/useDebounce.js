import React, { useEffect, useRef } from 'react';

export default function useDebounce(delay, resetKey) {
  const savedCallback = useRef();

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null && savedCallback.current) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay, resetKey]);

  const setCallback = callback => {
    savedCallback.current = callback;
  };

  return [setCallback];
}
