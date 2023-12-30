import { FC } from "react";
import { useAppSelector } from "../../../hooks/redux";

export const BetBuilderConfirmArea: FC = () => {
  const { singleBetData } = useAppSelector((state) => state.home);

  return (
    <>
      <div className="confirm-container flex-column">
        <div className="flex-row-space-between payout-area">
          <div className="payout-area-text">
            Total number of bets: {singleBetData.bets} <br /> Total bet amount:{" "}
            {singleBetData.totalBets}
          </div>
          <div className="payout-area-total flex-row">
            Payout: {singleBetData.totalBets * 2}$
          </div>
        </div>
        <div className="payout-area-text checkboxes">
          <input type="checkbox" /> i read all
        </div>
        <div className="payout-area-text checkboxes">
          <input type="checkbox" /> Confirm to payout
        </div>
        <button className="confirm-button flex-row">Confirm</button>
      </div>
    </>
  );
};
