import { useState, useEffect } from "react";

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const result = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(result);
  }, [value, delay]);

  return debouncedValue;
}
