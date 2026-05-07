import { RefObject, useEffect } from "react";

export const useAutoFocus = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return ref;
};
