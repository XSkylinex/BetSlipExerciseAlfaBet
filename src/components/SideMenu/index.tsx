import { FC } from "react";
import { createPortal } from "react-dom";
import { Accordion } from "../Accordion";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  removeAll,
  toggleSideMenu,
  increaseBetManual,
} from "../../store/slices/homeSlice";

import { BetBuilderList } from "./parts/BetBuilderList";
import { BetBuilderAddInput } from "./parts/BetBuilderAddInput";
import { BetBuilderRevenueBox } from "./parts/BetBuilderRevenueBox";
import { BetBuilderSingle } from "./parts/BetBuilderSingle";
import { BetBuilderConfirmArea } from "./parts/BetBuilderConfirmArea";

import leftArrow from "../../assets/sideMenu/svg/left-arrow.svg";
import TrashCan from "../../assets/sideMenu/svg/trashCan.svg";

import "./sideMenu.css";

export const SideMenu: FC = () => {
  const { sideMenu, sumTotalValue, selectedBoxes } = useAppSelector(
    (state) => state.home
  );
  const dispacth = useAppDispatch();
  const toggleSidebar = () => {
    dispacth(toggleSideMenu());
  };

  const handleDeleteAll = () => {
    dispacth(removeAll());
  };

  const updateValue = (e: any) => {
    dispacth(increaseBetManual(parseInt(e.target.value)));
  };

  return createPortal(
    <>
      <div
        className={`side-menu-bg ${sideMenu ? "visible" : ""}`}
        onClick={toggleSidebar}
      ></div>
      <div className={`side-menu-container ${sideMenu ? "visible" : ""}`}>
        <div className="flex-column">
          <div className="side-menu-back flex-row" onClick={toggleSidebar}>
            <img
              src={leftArrow}
              alt="side-menu-left-arrow"
              className="side-menu-left-arrow"
            />
            Back
          </div>
          <Accordion title="Bet Builder" className="side-menu-accordion">
            <div className="side-menu-accordion-inner">
              <BetBuilderList />
              <img
                src={TrashCan}
                alt="trash-can"
                className="delete-all"
                onClick={handleDeleteAll}
              />
              <BetBuilderAddInput
                updateValue={updateValue}
                value={sumTotalValue}
                globalValue={true}
              />
              <BetBuilderRevenueBox value={sumTotalValue} />
            </div>
          </Accordion>

          <Accordion title="Single" className="side-menu-accordion">
            {selectedBoxes &&
              selectedBoxes.map((n) => (
                <div
                  className="side-menu-accordion-inner"
                  key={`${n?.name}-${n.value}-${n.sectionId}`}
                >
                  <BetBuilderSingle {...n} />
                </div>
              ))}
          </Accordion>
          <BetBuilderConfirmArea />
        </div>
      </div>
    </>,
    document.getElementById("side-menu-portal")!
  );
};
