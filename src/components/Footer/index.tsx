import { FC } from "react";

import "./footer.css"

import FooterImage from "../../assets/footer/image/Footer.png";

export const Footer: FC = () => {
  return (
    <footer className="footer-container">
      <img src={FooterImage} alt="FooterImage" />
    </footer>
  );
};
