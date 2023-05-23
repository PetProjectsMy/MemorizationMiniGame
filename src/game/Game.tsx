import { type FC } from "react";
import MemorizationPanel from "./MemorizationPanel/MemorizationPanel";
import PickingPanel from "./PickingPanel/PickingPanel";
import { GameContext } from "./GameContext/context";
import { useGameContext } from "./GameContext/useGameContext";
import "./Game.css";
import { GameStage } from "./GameContext/types";

const Game: FC = () => {
  const gameStageContext = useGameContext();
  const {
    gameStatusRef,
    memorizationSequenceRef,
    expandMemorizationSequence,
    switchStageType,
  } = gameStageContext;

  if (
    gameStatusRef.current.stage ===
    GameStage.MEMORIZATION
  ) {
    if (!memorizationSequenceRef.current.length) {
      expandMemorizationSequence();
    }

    // if (gameStatusRef.current.level === 1) {
    //   switchStageType();
    // }
  }

  return (
    <GameContext.Provider
      value={gameStageContext}
    >
      <div className="game">
        <MemorizationPanel />
        <PickingPanel />
      </div>
    </GameContext.Provider>
  );
};

export { Game };
