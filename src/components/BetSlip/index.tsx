import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleSideMenu } from "../../store/slices/homeSlice";

import "./betSlip.css";

interface IBetSlipProps {
  isVisible: boolean;
  height: number;
}

export const BetSlip: FC<IBetSlipProps> = ({ isVisible, height }) => {
  const { sumTotalValue, boxLength } = useAppSelector((state) => state.home);
  const dispacth = useAppDispatch();

  const openSideMenu = () => {
    dispacth(toggleSideMenu());
  };

  return (
    <>
      <div
        className="bet-slip-container flex-row-space-between"
        onClick={openSideMenu}
        style={
          isVisible
            ? {
                bottom: `${height}px`,
                transform: `translateY(${!boxLength ? "100%" : "0"})`,
              }
            : {
                bottom: `${height}px`,
                transform: `translateY(${!!boxLength ? `${height}px` : "0"})`,
              }
        }
      >
        <div className="bet-slip-left flex-row">
          <span className="bet-slip-number flex-row">{boxLength}</span>
          <span className="bet-slip-text">Bet slip</span>
        </div>
        <div
          className="bet-slip-right flex-row"
          style={sumTotalValue >= 0 ? {} : { background: "red" }}
        >
          {sumTotalValue > 0 ? "+" : ""} {sumTotalValue}
        </div>
      </div>
    </>
  );
};
