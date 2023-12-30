import { FC, useState, ReactNode } from "react";

import Arrow from "../../assets/accordion/svg/arrowDown.svg";

import "./accordion.css";

interface IAccordionProps {
  children: ReactNode;
  title: string;
  className?: string;
}

export const Accordion: FC<IAccordionProps> = ({
  children,
  title,
  className,
}) => {
  const [show, setShow] = useState(false);

  const toggleAccordion = () => {
    setShow(!show);
  };

  return (
    <>
      <div
        onClick={toggleAccordion}
        className={`accordion-container flex-row ${show ? "open" : ""} ${
          className ? className : ""
        }`}
      >
        <img
          src={Arrow}
          alt="arrow"
          className={show ? "arrow-up" : "arrow-down"}
        />
        <span>{title}</span>
      </div>
      <div
        className={`accordion-content ${show ? "show" : ""}`}
        style={{ maxHeight: show ? `${120}vh` : "0" }}
      >
        <div className="accordion-content-inner">{children}</div>
      </div>
    </>
  );
};
