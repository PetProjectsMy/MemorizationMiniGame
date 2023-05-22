import {
  useCallback,
  useEffect,
  useState,
} from "react";
import type { WithPickingPanelContextArgs } from "./types";

const RESETTING_DURATION = 1000;

export function usePickedSequenceResetting({
  pickingPanelContext,
}: WithPickingPanelContextArgs) {
  const [
    isPickedSequenceResetting,
    setIsPickedSequenceResetting,
  ] = useState(false);

  useEffect(() => {
    const resetPickedSequence = () => {
      pickingPanelContext.blockPicking();
      setIsPickedSequenceResetting(true);
    };

    pickingPanelContext.resetPickedSequence =
      resetPickedSequence;
  }, []);

  const resetPickingPanel =
    useCallback(async () => {
      const {
        memorizationSequence,
        currentPickIndexRef,
        lastPickedFragmentIndexRef,
        resetProgressbar,
        resetCurrentPickIndex,
        unblockPicking,
      } = pickingPanelContext;

      const sequenceToReset =
        memorizationSequence.slice(
          0,
          currentPickIndexRef.current
        );
      const lastPickedFragment =
        lastPickedFragmentIndexRef.current;
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
            }, RESETTING_DURATION);
            resolve();
          })
      );
      const resetProgressbarPromise =
        new Promise<void>((resolve) => {
          setTimeout(() => {
            resetProgressbar();
            resolve();
          }, RESETTING_DURATION);
        });

      await Promise.all([
        ...resetButtons,
        resetProgressbarPromise,
      ]);

      resetCurrentPickIndex();
      unblockPicking();
      setIsPickedSequenceResetting(false);
    }, []);

  useEffect(() => {
    if (isPickedSequenceResetting) {
      resetPickingPanel();
    }
  }, [isPickedSequenceResetting]);

  return {
    isPickedSequenceResetting,
  };
}
