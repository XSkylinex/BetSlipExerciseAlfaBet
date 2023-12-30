import { FC } from "react";

export const BetBuilderRevenueBox: FC<{ value: number }> = ({ value }) => {
  return (
    <div className="revenue-box flex-row">
      Payout:
      {value > 0 ? " $ " + value * 1.5 : " Number is Negative ＼(ﾟｰﾟ＼)"}
    </div>
  );
};
