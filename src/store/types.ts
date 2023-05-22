export const enum GameStageType {
  MEMORIZATION,
  REPRODUCTION,
}

export type GameStage = {
  type: GameStageType;
  level: number;
};

export type MemorizationGameState = {
  memorizationSequence: number[];
  gameStage: GameStage;
};
