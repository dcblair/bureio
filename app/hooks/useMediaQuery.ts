import * as React from "react";

export const useMediaQuery = () => {
  const [screenWidth, setScreenWidth] = React.useState<number | undefined>();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
    }
  }, [])

  return screenWidth;
}

export default useMediaQuery;