import {
  type FC,
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import ProgressBar, {
  ProgressbarIndicatorStatus,
} from "../ProgressBar/ProgressBar";
import PickingButton from "./PickingButton/PickingButton";
import type { PickingPanelContext } from "./types";
import "./PickingPanel.css";

type Props = { pickingSequence?: number[] };

const PickingPanel: FC<Props> = ({
  pickingSequence = [],
}) => {
  const [pickingIndex, setPickingIndex] =
    useState<number>(0);
  const [
    progressbarIndicators,
    setProgressbarIndicators,
  ] = useState<ProgressbarIndicatorStatus[]>([]);
  const [
    isSequenceResetting,
    setIsSequenceResetting,
  ] = useState(false);

  const pickingIndexRef = useRef<number>(0);
  pickingIndexRef.current = pickingIndex;
  const lastPickedFragmentRef = useRef<
    number | null
  >(null);

  const resetPickedSequence = () => {
    setIsSequenceResetting(true);
  };

  const pickingPanelContext: PickingPanelContext =
    useMemo(
      () => ({
        resetPickedSequence,
        pickingSequence,
        pickingIndexRef,
        lastPickedFragmentRef,
        resetPickButton: {},
        expandProgressbar: (
          indicatorStatus: ProgressbarIndicatorStatus
        ) => {
          setProgressbarIndicators(
            (indicators) => [
              ...indicators,
              indicatorStatus,
            ]
          );
        },
      }),
      []
    );

  const pickingButtons = useMemo(
    () =>
      Array.from({
        length: 9,
      }).map((_, index) => (
        <PickingButton
          key={index}
          buttonIndex={index}
          disabled={isSequenceResetting}
          pickingPanelContext={
            pickingPanelContext
          }
        />
      )),
    [isSequenceResetting]
  );

  const reset = useCallback(async () => {
    const resetTimeout = 1000;

    const sequenceToReset = pickingSequence.slice(
      0,
      pickingIndexRef.current
    );
    const lastPickedFragment =
      lastPickedFragmentRef.current;
    if (lastPickedFragment !== null) {
      sequenceToReset.push(lastPickedFragment);
    }

    console.log(
      `SEQUENCE TO RESET: ${JSON.stringify(
        sequenceToReset
      )}\nLAST PICKED: ${lastPickedFragment}`
    );
    const resetButtons = sequenceToReset.map(
      (fragmentIndex) =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            pickingPanelContext.resetPickButton[
              fragmentIndex
            ]?.();
          }, resetTimeout);
          resolve();
        })
    );
    const resetProgressbar = new Promise<void>(
      (resolve) => {
        setTimeout(() => {
          setProgressbarIndicators([]);
          resolve();
        }, resetTimeout);
      }
    );

    await Promise.all([
      ...resetButtons,
      resetProgressbar,
    ]);

    setPickingIndex(0);
    setIsSequenceResetting(false);
  }, []);

  useEffect(() => {
    if (isSequenceResetting) {
      reset();
    }
  }, [isSequenceResetting]);

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
