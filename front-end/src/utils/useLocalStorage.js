import { useState, useEffect } from "react";

function useLocalState(defaultValue, key) {
  const [localValue, setLocalValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localValue));
  }, [key, localValue]);

  return [localValue, setLocalValue];
}

export { useLocalState };
