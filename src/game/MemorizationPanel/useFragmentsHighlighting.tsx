import { useCallback, useContext, useEffect } from 'react';
import { GameContext } from '../GameContext/context';
import { GameStage } from '../GameContext/types';
import { MEMORIZATION_FRAGMENT_HIGHLIGHTING_DURATION } from './constants';
import { MemorizationPanelContext } from './types';

type Args = {
  memorizationPanelContext: MemorizationPanelContext;
};

export function useFragmentsHighlighting({ memorizationPanelContext }: Args) {
  const { gameStatusRef, memorizationSequenceRef, switchStageType } =
    useContext(GameContext);
  const gameStage = gameStatusRef.current.stage;

  const { toggleFragmentHighlighting } = memorizationPanelContext;

  type AbortSignalArg = { signal: AbortSignal };
  const createHighlightCompletionWaitingPromise = useCallback(
    (timeout: number, { signal }: AbortSignalArg) =>
      new Promise<void>((resolve, reject) =>
        setTimeout(() => {
          if (signal.aborted) {
            reject('ABORTED WITH SIGNAL');
          }

          resolve();
        }, timeout),
      ),
    [],
  );

  const highlightMemorizationFragment = useCallback(
    async (fragmentIndex: number, { signal }: AbortSignalArg) => {
      const highlightingDuration = MEMORIZATION_FRAGMENT_HIGHLIGHTING_DURATION;
      const highlightingDurationSlightlyReduced =
        0.7 * MEMORIZATION_FRAGMENT_HIGHLIGHTING_DURATION;

      const toggleHighlighting = toggleFragmentHighlighting[fragmentIndex];

      console.log(`FRAGMENT-${fragmentIndex} LIGHT ON`);
      toggleHighlighting();
      await createHighlightCompletionWaitingPromise(highlightingDuration, {
        signal,
      });

      console.log(`FRAGMENT-${fragmentIndex} LIGHT OFF`);
      toggleHighlighting();
      await createHighlightCompletionWaitingPromise(highlightingDurationSlightlyReduced, {
        signal,
      });
    },
    [],
  );

  const highlightMemorizationSequence = useCallback(
    async ({ signal }: AbortSignalArg) => {
      try {
        console.log(
          `HIGHLIGHT SEQUENCE: ${JSON.stringify(memorizationSequenceRef.current)}`,
        );

        for (const fragmentIndex of memorizationSequenceRef.current) {
          await highlightMemorizationFragment(fragmentIndex, { signal });
        }
      } catch (error) {
        console.log(`ERROR: ${error}`);

        for (const fragmentIndex of memorizationSequenceRef.current) {
          toggleFragmentHighlighting[fragmentIndex](false);
        }
      }

      console.log(`HIGHLIGHTING COMPLETED`);
      switchStageType();
    },
    [],
  );

  useEffect(() => {
    if (gameStage !== GameStage.MEMORIZATION) {
      return;
    }

    const controller = new AbortController();
    highlightMemorizationSequence({
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [gameStage]);
}
