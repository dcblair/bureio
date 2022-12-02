import * as React from "react";

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = React.useState<number | undefined>();

  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)

      return () => window.removeEventListener("resize", handleResize)
    }
  })

  return screenWidth;
}

export default useScreenWidth;