import { RefObject, useEffect } from "react";

export const useAutoFocus = <T extends HTMLElement>(
  ref: RefObject<T>,
  condition = true,
) => {
  useEffect(() => {
    if (condition && ref.current) {
      ref.current.focus();
    }
  }, [condition]);

  return ref;
};
