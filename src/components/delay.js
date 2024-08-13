// DelayedComponent.js
import React, { useState, useEffect } from 'react';

const DelayedComponent = ({ delay, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log("delay")
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <>
      {isVisible && children}
    </>
  );
};

export default DelayedComponent;
