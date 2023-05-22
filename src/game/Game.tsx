import {
  type FC,
  useState,
  useEffect,
} from "react";
import MemorizationPanel from "./MemorizationPanel/MemorizationPanel";
import { useMemorizationSequence } from "./useMemorizationSequence";
import PickingPanel from "./PickingPanel/PickingPanel";
import "./Game.css";
import { MemorizationGameStateDispatcher } from "../store/store";
import { useSelector } from "react-redux";
import {
  selectGameStage,
  selectMemorizationSequence,
} from "../store/selectors";
import { GameStageType } from "../store/types";

const Game: FC = () => {
  const {
    type: gameStageType,
    level: gameStageLevel,
  } = useSelector(selectGameStage);
  const memorizationSequence = useSelector(
    selectMemorizationSequence
  );

  if (
    gameStageType === GameStageType.MEMORIZATION
  ) {
    MemorizationGameStateDispatcher.expandMemorizationSequence();
    MemorizationGameStateDispatcher.changeGameStage(
      {
        level: gameStageLevel,
        type: GameStageType.REPRODUCTION,
      }
    );
  }

  return (
    <div className="game">
      <MemorizationPanel
        fragmentsToMemorize={memorizationSequence}
      />
      <PickingPanel
        pickingSequence={memorizationSequence}
      />
    </div>
  );
};

export { Game };
