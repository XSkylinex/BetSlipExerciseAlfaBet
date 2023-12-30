import { FC } from "react";

import {
  decreaseBet,
  decreaseSingleBet,
  increaseBet,
  increaseSingleBet,
} from "../../../store/slices/homeSlice";
import { useAppDispatch } from "../../../hooks/redux";

import PlusSign from "../../../assets/sideMenu/svg/plusSign.svg";
import MinusSign from "../../../assets/sideMenu/svg/minusSign.svg";

interface IBetBuilderAddInputProps {
  name?: string;
  value?: number;
  updateValue: (value: any) => void;
  sectionId?: number;
  globalValue?: boolean;
  singleBet?: number;
}

export const BetBuilderAddInput: FC<IBetBuilderAddInputProps> = ({
  name,
  value,
  updateValue,
  sectionId,
  globalValue = false,
  singleBet = 0,
}) => {
  const dispacth = useAppDispatch();

  const incrementValue = () => {
    if (globalValue) {
      dispacth(increaseBet());
    } else {      
      if (!sectionId || !name || !value) return;
      dispacth(increaseSingleBet({ sectionId, name, value }));
    }
  };
  const decrementValue = () => {
    if (globalValue) {
      dispacth(decreaseBet());
    } else {
      if (!sectionId || !name || !value) return;
      dispacth(decreaseSingleBet({ sectionId, name, value }));
    }
  };

  return (
    <>
      <div className="bet-builder-container flex-row">
        <img src={PlusSign} alt="plus-sign" onClick={incrementValue} />
        <div>
          <span>$</span>
          <input
            onChange={updateValue}
            className="bet-builder-input"
            type="number"
            value={globalValue ? value : singleBet ? singleBet : 0}
          />
        </div>
        <img src={MinusSign} alt="minus-sign" onClick={decrementValue} />
      </div>
    </>
  );
};
