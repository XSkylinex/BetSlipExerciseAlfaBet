import { FC, useState, useEffect } from "react";

export const LiveTime: FC = () => {
  const [time, setTime] = useState(new Date());
  const [showDots, setShowDots] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setShowDots((prevShowDots) => !prevShowDots);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedMinutes = time.getMinutes().toString().padStart(2, "0");
  const formattedHours = time.getHours().toString().padStart(2, "0");

  const formattedTime = `${formattedHours}${showDots ? ":" : " "}${formattedMinutes}`;

  return <>{formattedTime}</>;
};
