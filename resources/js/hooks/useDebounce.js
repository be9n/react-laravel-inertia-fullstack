import { useEffect, useRef, useState } from "react";

/**
 * A custom hook for debouncing values and performing actions after the debounce period
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} - The debounced value
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up the debounce timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer on component unmount or value change
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
