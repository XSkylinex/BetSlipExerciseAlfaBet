import { FC } from "react";

import "./toggle.css";

interface IToggleProps {}

export const Toggle: FC<IToggleProps> = () => {
  return (
    <>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </>
  );
};
