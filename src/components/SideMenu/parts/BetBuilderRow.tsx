import { FC } from "react";

import { removeSelectedBox } from "../../../store/slices/homeSlice";
import { useAppDispatch } from "../../../hooks/redux";

import StopSing from "../../../assets/sideMenu/svg/removeOne.svg";
import GreyVerticalLine from "../../../assets/sideMenu/svg/greyVerticalLine.svg";

interface IBetBuilderRowProps {
  name: string;
  sectionId: number;
  value: number;
  sectionName: string;
}

export const BetBuilderRow: FC<IBetBuilderRowProps> = ({
  name,
  sectionId,
  value,
  sectionName,
}) => {
  const dispacth = useAppDispatch();
  const removeItem = () => {
    dispacth(removeSelectedBox({ name, sectionId, value }));
  };
  return (
    <>
      <div className="bet-builder-row flex-row">
        <div className="stop-sign-area flex-column">
          <img
            src={StopSing}
            alt="stopSing"
            className="flex-row"
            onClick={removeItem}
          />
          <img src={GreyVerticalLine} className="grey-vertical-line flex-row" />
        </div>

        <div className="bet-builder-row-text flex-column">
          {name} <span>{sectionName}</span>
        </div>
      </div>
    </>
  );
};
