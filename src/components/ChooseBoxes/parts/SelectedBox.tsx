import { FC } from "react";

import { IOption } from "../index";
import { useAppDispatch } from "../../../hooks/redux";
import { removeSelectedBox } from "../../../store/slices/homeSlice";

interface ISelectedBoxProps {
  option: IOption;
  handleItemClick: (data: IOption) => void;
  column?: boolean;
  selected: boolean;
  sectionId: number;
}

export const SelectedBox: FC<ISelectedBoxProps> = ({
  option,
  handleItemClick,
  column = false,
  selected,
  sectionId,
}) => {
  const dispatch = useAppDispatch();
  const { value, name } = option;

  const removeBox = (data: IOption) => {
    dispatch(removeSelectedBox(data));
  };
  
  return (
    <>
      <div
        className={`selected-box-style ${
          column ? "column flex-row-space-between" : "row flex-column"
        } ${selected ? "selected" : ""}`}
        onClick={
          selected
            ? () => removeBox({ ...option, sectionId })
            : () => handleItemClick({ ...option, sectionId })
        }
      >
        {name || ""}
        <span>{(value > 0 ? `+${value}` : value) || ""}</span>
      </div>
    </>
  );
};
