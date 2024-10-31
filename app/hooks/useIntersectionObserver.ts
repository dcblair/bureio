import * as React from 'react';

export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit,
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [intersectionCount, setIntersectionCount] = React.useState(0);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersectionCount((prevCount) => prevCount + 1);
        setIsIntersecting(true);
      } else {
        setIsIntersecting(false);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return { intersectionCount, isIntersecting };
};
