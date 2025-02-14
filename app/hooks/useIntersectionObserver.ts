import { useEffect, type RefObject, useState } from "react";

export const useIntersectionObserver = (
  ref: RefObject<Element>,
  options?: IntersectionObserverInit,
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersectionRatio(entry.intersectionRatio);
      if (entry.isIntersecting) {
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

  return { intersectionRatio, isIntersecting };
};
