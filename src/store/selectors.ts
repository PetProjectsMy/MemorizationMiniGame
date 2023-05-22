import type { RootState } from "./store";

export const selectGameStage = (
  state: RootState
) => state.gameStage;

export const selectMemorizationSequence = (
  state: RootState
) => state.memorizationSequence;
