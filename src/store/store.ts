import {
  bindActionCreators,
  configureStore,
} from "@reduxjs/toolkit";
import {
  memorizationGameReducer,
  memorizationGameActions,
} from "./game.slice";

export const store = configureStore({
  reducer: memorizationGameReducer,
});

export const MemorizationGameStateDispatcher =
  bindActionCreators(
    memorizationGameActions,
    store.dispatch
  );

export type RootState = ReturnType<
  (typeof store)["getState"]
>;
