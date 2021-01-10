import { useLayoutEffect, useState } from 'react';
import debounce from 'debounce';

/**
 * A hook for getting the current window size
 *
 * @param debounceInterval the minimum time between updates in milliseconds
 */
const useWindowSize = (debounceInterval: number = 200) => {
  // Store initial window size
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Setup resize event listener
  useLayoutEffect(() => {
    // Create function for updating the stored window size
    const updateSize = debounce(
      () => setSize({ width: window.innerWidth, height: window.innerHeight }),
      debounceInterval,
    );

    // Add listener to window resize event
    window.addEventListener('resize', updateSize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSize);
      updateSize.clear();
    };
  }, [debounceInterval]);

  return size;
};

export default useWindowSize;
