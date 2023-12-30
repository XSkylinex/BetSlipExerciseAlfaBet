import { FC } from "react";

import { useAppSelector } from "../../../hooks/redux";

import CtaImage from "../../../assets/sideMenu/svg/CTARed.svg";
import { BetBuilderRow } from "./BetBuilderRow";

export const BetBuilderList: FC = () => {
  const { selectedBoxes, boxLength, sumTotalValue } = useAppSelector(
    (state) => state.home
  );

  return (
    <>
      <article className="bet-builder-list flex-column">
        <div className="bet-builder-list-title flex-row">
          <img src={CtaImage} alt="ctaImage" /> {boxLength} Picks
        </div>
        <div className="bet-builder-list-h1 flex-row-space-between">
          <span>Pumas UNAM vs América</span>
          {sumTotalValue >= 0 ? `+${sumTotalValue}` : sumTotalValue}
        </div>
        {selectedBoxes &&
          selectedBoxes.map((n, i) => {
            return <BetBuilderRow {...n} key={`bet-builder-row-${i}`} />;
          })}
      </article>
    </>
  );
};
