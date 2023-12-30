import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./App.tsx";

import { store } from "./store/store.ts";

import { NetworkErrorPortal } from "./components/NetworkError/index.tsx";
import { SideMenu } from "./components/SideMenu/index.tsx";

import "./index.css";

import "react-tooltip/dist/react-tooltip.css";
import "normalize.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <NetworkErrorPortal />
    <SideMenu />
  </Provider>

);