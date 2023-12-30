import { FC, useEffect, useState, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { BetSlip } from "../BetSlip";
import NavigationBarImage from "../../assets/navigationBar/image/navigationBar.png";
import { setBetSlipHight } from "../../store/slices/homeSlice";

import "./navigationBar.css";

export const NavigationBar: FC = () => {
  const { boxLength, sideMenu, betSlipHight } = useAppSelector(
    (state) => state.home
  );
  const dispatch = useAppDispatch();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setBetSlipHight(ref.current?.clientHeight || 0));
  }, [dispatch, boxLength]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setIsVisible(!isScrollingDown);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      {!sideMenu && (
        <div ref={ref} className={`navbar ${isVisible ? "visible" : "hidden"}`}>
          <img src={NavigationBarImage} alt="NavigationBarImage" />
        </div>
      )}

      {!!boxLength && !sideMenu && (
        <BetSlip height={betSlipHight - 3} isVisible={isVisible} />
      )}
    </>
  );
};
