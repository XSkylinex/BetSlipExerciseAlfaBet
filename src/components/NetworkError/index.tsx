import { useEffect, useState, FC } from "react";
import { createPortal } from "react-dom";

import "./networkError.css";

export const NetworkErrorPortal: FC<{}> = () => {
  const [isNetworkStable, setIsNetworkStable] = useState(true);

  useEffect(() => {
    const handleNetworkChange = () => {
      setIsNetworkStable(navigator.onLine);
    };

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  return createPortal(
    <>
      {!isNetworkStable && (
        <div className="network-error">
          <p>Network connection lost. Please check your internet connection.</p>
        </div>
      )}
    </>,
    document.getElementById("network-error-portal")!
  );
};
