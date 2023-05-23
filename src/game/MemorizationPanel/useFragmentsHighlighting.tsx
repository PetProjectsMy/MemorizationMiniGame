import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GameContext } from "../GameContext/context";
import { MemorizationPanelContext } from "./types";
import { GameStage } from "../GameContext/types";
import { MEMORIZATION_FRAGMENT_HIGHLIGHTING_DURATION } from "./constants";

type Args = {
  memorizationPanelContext: MemorizationPanelContext;
};

export function useFragmentsHighlighting({
  memorizationPanelContext,
}: Args) {
  const {
    gameStatusRef,
    memorizationSequenceRef,
    switchStageType,
  } = useContext(GameContext);
  const gameStage = gameStatusRef.current.stage;

  const { toggleFragmentHighlighting } =
    memorizationPanelContext;

  const createHighlightCompletionWaitingPromise =
    useCallback(
      () =>
        new Promise((resolve) =>
          setTimeout(
            resolve,
            MEMORIZATION_FRAGMENT_HIGHLIGHTING_DURATION
          )
        ),
      []
    );

  const highlightMemorizationFragment =
    useCallback(async (fragmentIndex: number) => {
      const toggleHighlighting =
        toggleFragmentHighlighting[fragmentIndex];

      toggleHighlighting();
      await createHighlightCompletionWaitingPromise();
      toggleHighlighting();
      await createHighlightCompletionWaitingPromise();
    }, []);

  const highlightMemorizationSequence =
    useCallback(async () => {
      console.log(
        `HIGHLIGHT SEQUENCE: ${JSON.stringify(
          memorizationSequenceRef.current
        )}`
      );

      for (const fragmentIndex of memorizationSequenceRef.current) {
        await highlightMemorizationFragment(
          fragmentIndex
        );
      }

      console.log(`HIGHLIGHTING COMPLETED`);
      switchStageType();
    }, []);

  useEffect(() => {
    if (gameStage !== GameStage.MEMORIZATION) {
      return;
    }

    highlightMemorizationSequence();
  }, [gameStage]);
}
