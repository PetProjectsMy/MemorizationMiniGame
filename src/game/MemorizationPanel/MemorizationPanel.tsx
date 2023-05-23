import { FC, memo, useContext } from "react";
import ProgressBar, {
  ProgressbarIndicatorStatus,
} from "../ProgressBar/ProgressBar";
import { useFragmentsHighlighting } from "./useFragmentsHighlighting";
import { GameContext } from "../GameContext/context";
import "./MemorizationPanel.css";

const MemorizationPanel: FC = () => {
  const { memorizationSequenceRef } =
    useContext(GameContext);
  const memorizationSequence =
    memorizationSequenceRef.current;

  const { fragmentsGrid } =
    useFragmentsHighlighting({
      memorizationSequence,
    });

  const indicatorsStatuses = Array(
    memorizationSequence.length
  ).fill(ProgressbarIndicatorStatus.SUCCESS);

  return (
    <div className="game__puzzle-panel">
      <ProgressBar
        indicatorsStatuses={indicatorsStatuses}
      />
      <div className="game__memorization-panel">
        {fragmentsGrid}
      </div>
    </div>
  );
};

export default MemorizationPanel;
