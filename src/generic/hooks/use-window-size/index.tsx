import { useLayoutEffect, useState } from 'react';
import debounce from 'debounce';

interface Size {
  width: number;
  height: number;
}

// Hook that returns current window size
const useWindowSize = (debounceInterval: number = 200) => {
  // Store initial window size
  const [size, setSize] = useState<Size>({
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
