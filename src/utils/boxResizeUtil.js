import { useEffect, useState, useRef } from "react";

/**
 * Custom hook to automatically scale a component when it touches the window's margins.
 * @param {number} marginThreshold - Distance from the window edge to trigger scaling.
 * @param {number} widthDivider
 * @returns {Object} - Returns the ref for the element and the current scale.
 */
export const useAutoScaling = (marginThreshold = 100, widthDivider = 1000) => {
  const [scale, setScale] = useState(1); // Initial scale
  const elementRef = useRef(null); // Ref for the element to track its dimensions

  // Function to update the scale based on window size and element position
  const handleResize = () => {
    const windowWidth = window.innerWidth;

    if (elementRef.current) {
      const boxRect = elementRef.current.getBoundingClientRect(); // Get element dimensions

      // Check if the element is near the edges of the window
      const isTouchingLeft = boxRect.left <= marginThreshold;
      const isTouchingRight = windowWidth - boxRect.right <= marginThreshold;

      // If the element is touching any margin, apply the scale
      if (isTouchingLeft || isTouchingRight) {
        let newScale = windowWidth / widthDivider;
        setScale(newScale); // Apply reduced scale
      } else {
        setScale(1); // Reset to default scale
      }
    }
  };

  // Set up event listeners for resize and cleanup
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set the scale

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup listener
    };
  }, [marginThreshold]);

  return { scale, elementRef }; // Return the current scale and element reference
};
