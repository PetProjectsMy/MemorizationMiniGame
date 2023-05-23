import {
  type FC,
  useMemo,
  useContext,
} from "react";
import ProgressBar, {
  ProgressbarIndicatorStatus,
} from "../ProgressBar/ProgressBar";
import PickingButton from "./PickingButton/PickingButton";
import type { PickingPanelContext } from "./types";
import "./PickingPanel.css";
import {
  usePickStatus,
  usePickingBlock,
  usePickedSequenceResetting,
  useProgressbar,
} from "./hooks";
import { GameContext } from "../GameContext/context";

const PickingPanel: FC = () => {
  const { memorizationSequenceRef } =
    useContext(GameContext);
  const memorizationSequence =
    memorizationSequenceRef.current;

  const pickingPanelContext = useMemo(
    () =>
      ({
        memorizationSequence,
        resetPickButton: {},
      } as PickingPanelContext),
    []
  );

  usePickStatus({ pickingPanelContext });
  usePickingBlock({
    pickingPanelContext,
  });
  usePickedSequenceResetting({
    pickingPanelContext,
  });
  const { progressbarIndicators } =
    useProgressbar({ pickingPanelContext });

  const pickingButtons = useMemo(
    () =>
      Array.from({
        length: 9,
      }).map((_, index) => (
        <PickingButton
          key={index}
          buttonIndex={index}
          pickingPanelContext={
            pickingPanelContext
          }
        />
      )),
    []
  );

  return (
    <div className="game__puzzle-panel">
      <ProgressBar
        indicatorsStatuses={progressbarIndicators}
      />
      <div className="game__picking-panel">
        {pickingButtons}
      </div>
    </div>
  );
};

export default PickingPanel;
