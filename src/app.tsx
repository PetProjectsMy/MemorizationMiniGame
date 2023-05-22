import ReactDOM from "react-dom/client";
import React from "react";
import { Game } from "./game/Game";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = document.getElementById(
  "root"
) as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <Game></Game>
    </Provider>
  </React.StrictMode>
);
