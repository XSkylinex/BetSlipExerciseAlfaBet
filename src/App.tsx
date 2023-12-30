import { FC, useEffect } from "react";
import { PhoneBar } from "./components/PhoneBar";
import { Home } from "./pages/Home";
import { NavigationBar } from "./components/NavigationBar";
import { Footer } from "./components/Footer";
import "./App.css";
import { useAppSelector } from "./hooks/redux";

export const App: FC = () => {
  const { sideMenu } = useAppSelector((state) => state.home);

  useEffect(() => {
    // Get the body element
    const body = document.body;

    // Set the overflow property based on the sideMenu state
    body.style.overflow = sideMenu ? "hidden" : "auto";

    // Cleanup function to reset styles when the component is unmounted or sideMenu is closed
    return () => {
      body.style.overflow = "auto";
    };
  }, [sideMenu]);

  return (
    <>
      <div id="app">
        <PhoneBar />
        <Home />
        <NavigationBar />
        <Footer />
      </div>
    </>
  );
};
