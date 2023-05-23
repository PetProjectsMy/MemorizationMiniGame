export const enum GameStage {
  MEMORIZATION,
  REPRODUCTION,
}

export type GameStatus = {
  stage: GameStage;
  level: number;
};

type Callback = () => void;

export type GameContext = {
  gameStatusRef: React.MutableRefObject<GameStatus>;

  memorizationSequenceRef: React.MutableRefObject<
    number[]
  >;
  expandMemorizationSequence: Callback;

  switchStageType: Callback;
  increaseStageLevel: Callback;
};
