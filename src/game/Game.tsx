import { type FC } from 'react';
import { GameContext } from './GameContext/context';
import { GameStage } from './GameContext/types';
import { useGameContext } from './GameContext/useGameContext';
import MemorizationPanel from './MemorizationPanel/MemorizationPanel';
import PickingPanel from './PickingPanel/PickingPanel';

import './Game.css';

const GAME_MAX_LEVEL = 5;

const Game: FC = () => {
  const gameStageContext = useGameContext();
  const { gameStatusRef, memorizationSequenceRef, expandMemorizationSequence } =
    gameStageContext;
  const gameStatus = gameStatusRef.current;

  if (
    gameStatus.stage === GameStage.MEMORIZATION &&
    !memorizationSequenceRef.current.length
  ) {
    expandMemorizationSequence();
  }

  return (
    <GameContext.Provider value={gameStageContext}>
      <div className="square-fragments-memorization-game">
        {gameStatus.level <= GAME_MAX_LEVEL ? (
          <>
            <MemorizationPanel />
            <PickingPanel />
          </>
        ) : (
          <div>Игра пройдена!</div>
        )}
      </div>
    </GameContext.Provider>
  );
};

export { Game };
