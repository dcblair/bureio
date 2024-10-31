import * as React from 'react';

export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit,
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [intersectionRatio, setIntersectionRatio] = React.useState(0);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersectionRatio(entry.intersectionRatio);
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        setHasAnimated(true);
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

  return { hasAnimated, intersectionRatio, isIntersecting };
};
