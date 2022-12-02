import * as React from "react";

export const useIntersectionObserver = (ref: React.RefObject<Element>, options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  // TODO: How do I set this per time it intersects?
  // const [intersectionCount, setIntersectionCount] = React.useState(0);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options])

  return { isIntersecting };
}

export default useIntersectionObserver;
