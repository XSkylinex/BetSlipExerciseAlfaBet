import { FC } from "react";
import { Tooltip } from "react-tooltip";
import { Toggle } from "../Toggle";

import InformationSign from "../../assets/toolTip/svg/tooltipIsign.svg";

import "./betBuilderSection.css";

export const BetBuilderSection: FC = () => {
  return (
    <>
      <div className="bet-Builder-container flex-row-space-between">
        <div className="bet-Builder-text flex-row">
          Bet Builder{" "}
          <img
            src={InformationSign}
            alt="informationSign"
            data-tooltip-id="infoSign"
          />
          <Tooltip id="infoSign" className="toolTip-style" place="top-start">
          Bet Builder allows multiple combinations to be played at the same event
          </Tooltip>
        </div>
        <Toggle />
      </div>
    </>
  );
};
