import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [WindowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const cleanUp = () => {
      console.log("runs after useeffect ");
      window.removeEventListener("resize", handleResize);
    };
    return cleanUp;
  }, []);

  return WindowSize;
};
export default useWindowSize;
