import { FC } from "react";

import { Hero } from "../../components/Hero";
import { BetBuilderSection } from "../../components/betBuilderSection";
import { Proposition } from "../../components/Proposition";
import { ReaderApi } from "./parts/ReaderApi";

import "./home.css";

export const Home: FC = () => {
  return (
    <>
      <article className="flex-column home-container">
        <Hero />
        <BetBuilderSection />
        <Proposition />
        <ReaderApi />
      </article>
    </>
  );
};
