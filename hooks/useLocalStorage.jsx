import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // Get the value from localStorage and parse it
  const getStoredValue = () => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  };

  // Use React useState to manage the local state
  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Sync with localStorage on mount
  useEffect(() => {
    setStoredValue(getStoredValue());
  }, [key]);

  // Update the localStorage when the state changes
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
