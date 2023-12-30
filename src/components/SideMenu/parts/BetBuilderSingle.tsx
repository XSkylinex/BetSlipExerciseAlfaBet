import { FC } from "react";

import { useAppDispatch } from "../../../hooks/redux";
import {
  increaseSingleBetManual,
  removeSelectedBox,
} from "../../../store/slices/homeSlice";

import { BetBuilderAddInput } from "./BetBuilderAddInput";
import { BetBuilderRevenueBox } from "./BetBuilderRevenueBox";

import TrashCan from "../../../assets/sideMenu/svg/trashCan.svg";

interface IBetBuilderSingleProps {
  name: string;
  sectionId: number;
  value: number;
  sectionName: string;
  singleBet?: number;
}

export const BetBuilderSingle: FC<IBetBuilderSingleProps> = ({
  name,
  sectionId,
  value,
  sectionName,
  singleBet,
}) => {
  const dispacth = useAppDispatch();

  const handleDelete = () => {
    dispacth(removeSelectedBox({ name, sectionId, value }));
  };

  const handleUpdateValue = (e: any) => {
    dispacth(
      increaseSingleBetManual({
        sectionId,
        name,
        value,
        singleBet: e.target.value,
      })
    );
  };

  return (
    <>
      <div className="bet-builder-single flex-column">
        <div className="flex-column bet-builder-single-title">
          <div>{name} - Pumas UNAM vs América</div>
          <div>{sectionName}</div>
        </div>
        <img
          src={TrashCan}
          alt="trash-can"
          className="delete-all"
          style={{ marginLeft: "auto" }}
          onClick={handleDelete}
        />
        <div className="flex-row-space-between">
          <BetBuilderAddInput
            updateValue={handleUpdateValue}
            name={name}
            sectionId={sectionId}
            value={value}
            singleBet={singleBet}
          />
          <span className="bet-builder-list-h1">
            {value > 0 ? `+${value}` : value}
          </span>
        </div>
        <BetBuilderRevenueBox value={value} />
      </div>
    </>
  );
};
