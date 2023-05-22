import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import type {
  GameStage,
  MemorizationGameState,
} from "./types";
import { expandPickingSequenceReducer } from "./pickingSequence.reducer";
import { GameStageType } from "./types";

const initialState: MemorizationGameState = {
  memorizationSequence: [],
  gameStage: {
    type: GameStageType.MEMORIZATION,
    level: 1,
  },
};

const memorizationGameSlice = createSlice({
  name: "memorization game",
  initialState,
  reducers: {
    expandMemorizationSequence:
      expandPickingSequenceReducer,
    changeGameStage: (
      state,
      action: PayloadAction<GameStage>
    ) => {
      state.gameStage = action.payload;
    },
  },
});

export const {
  actions: memorizationGameActions,
  reducer: memorizationGameReducer,
} = memorizationGameSlice;
