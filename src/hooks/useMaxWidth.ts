import { useState, useEffect } from "react";

export const useMaxWidth = (breakpoint: number): boolean => {
  const [isNarrower, setIsNarrower] = useState<boolean>(
    window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsNarrower(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleResize);

    setIsNarrower(window.innerWidth < breakpoint);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isNarrower;
};
