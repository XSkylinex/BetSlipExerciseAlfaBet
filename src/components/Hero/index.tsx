import { FC } from "react";

import "./hero.css";

import HeroImage from "../../assets/hero/image/Header.png";

export const Hero: FC = () => {
  return (
    <>
      <img className="hero-image" src={HeroImage} alt="HeroImage" />
    </>
  );
};
