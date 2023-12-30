import { FC, useState } from "react";

import "./proposition.css";

const propositionSliderList = [...Array(10).keys()].map((n, i) => ({
  name: `Proposition ${n}`,
  id: 10 + i,
}));

export const Proposition: FC = () => {
  const [active, setActive] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setActive(id);
  };

  return (
    <>
      <ul className="proposition-container flex-row">
        {propositionSliderList &&
          propositionSliderList.map((item, index) => (
            <li
              key={`id-should-come-from-backend-${item?.id || index}`}
              className={`flex-row ${active === item?.id ? "proposition-active" : ""}`}
              onClick={() => handleSelect(item?.id || index)}
            >
              {item?.name || ""}
            </li>
          ))}
      </ul>
    </>
  );
};
