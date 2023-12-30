import { FC } from "react";

import { LiveTime } from "./parts/LiveTime";
import { mobileSignsList } from "./parts/mobileSignsList";

import "./phoneBar.css";

export const PhoneBar: FC = () => {
  return (
    <>
      <nav className="phone-navbar flex-row-space-between">
        <div className="phone-navbar-time">
          <LiveTime />
        </div>
        <div className="flex-row">
          {mobileSignsList &&
            mobileSignsList.map((mobileSign, index) => (
              <img
                src={mobileSign?.icon || ""}
                alt={mobileSign?.name || ""}
                key={`id-should-come-from-backend-${mobileSign?.id || index}`}
              />
            ))}
        </div>
      </nav>
    </>
  );
};
