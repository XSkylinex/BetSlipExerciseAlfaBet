import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSelectedBoxes } from "../../store/slices/homeSlice";
import { SelectedBox } from "./parts/SelectedBox";

import "./chooseBoxes.css";

export interface IOption {
  value: number;
  name: string;
  sectionId: number;
  selectionMode?: "single" | "multi";
  sectionName: string;
  singleBet?: number;
}

interface IChooseBoxesProps {
  options: IOption[];
  selectionMode: "single" | "multi";
  column?: boolean;
  sectionId: number;
  sectionName: string;
}

export const ChooseBoxes: FC<IChooseBoxesProps> = ({
  selectionMode = "single",
  options,
  column = false,
  sectionId,
  sectionName,
}) => {
  const dispatch = useAppDispatch();
  const { selectedBoxes } = useAppSelector((state) => state.home);

  const handleItemClick = (data: IOption) => {
    const { name, value } = data;

    if (!name || !value) return;

    if (selectionMode === "single") {
      dispatch(
        setSelectedBoxes([
          { ...data, sectionId, selectionMode, sectionName, singleBet: 0 },
        ])
      );
    } else {
      const newSelectedItems = selectedBoxes.some(
        (box) =>
          box.value === value &&
          box.sectionId === sectionId &&
          box.name === name
      )
        ? selectedBoxes.filter(
            (box) =>
              box.value !== value &&
              box.sectionId !== sectionId &&
              box.name !== name
          )
        : [
            ...selectedBoxes,
            { ...data, sectionId, selectionMode, sectionName, singleBet: 0 },
          ];
      dispatch(setSelectedBoxes(newSelectedItems));
    }
  };

  return (
    <>
      <div
        className={`boxes-container ${
          column ? "boxes-column flex-column" : "boxes-row flex-row"
        }`}
      >
        {options &&
          options.map((option, index) => (
            <SelectedBox
              selected={selectedBoxes.some(
                (box) =>
                  box.value === option?.value &&
                  box.sectionId === sectionId &&
                  box.name === option?.name
              )}
              key={`id-should-come-from-backend-${option?.value || index}`}
              option={option}
              handleItemClick={() => handleItemClick(option)}
              column={column}
              sectionId={sectionId}
            />
          ))}
      </div>
    </>
  );
};
