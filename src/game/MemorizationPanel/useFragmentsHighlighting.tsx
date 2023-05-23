import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MemorizationFragment } from "./MemorizationFragment";
import { GameContext } from "../GameContext/context";

type Args = {
  memorizationSequence: number[];
};

export function useFragmentsHighlighting({
  memorizationSequence,
}: Args) {
  const [
    currentHighlightIndex,
    setCurrentFragmentIndex,
  ] = useState(0);
  const [
    isHighlightingCompleted,
    setIsHighlightingCompleted,
  ] = useState(false);

  const { gameStatusRef } =
    useContext(GameContext);
  const gameStatus = gameStatusRef.current;

  if (isHighlightingCompleted) {
    console.log("HIGHLIGHTING COMPLETED");
  }

  const fragmentsGrid = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, index) =>
        MemorizationFragment({ key: index })
      ),
    []
  );

  let fragmentToHighlightIndex:
    | number
    | undefined;
  if (!isHighlightingCompleted) {
    fragmentToHighlightIndex =
      memorizationSequence[currentHighlightIndex];
    fragmentsGrid[fragmentToHighlightIndex] =
      MemorizationFragment({
        isActive: true,
        key: fragmentToHighlightIndex,
      });

    console.log(
      `STAGE: ${gameStatus.stage},` +
        ` LEVEL: ${gameStatus.level},` +
        ` INDEX: ${currentHighlightIndex},` +
        ` FRAGMENT: ${fragmentToHighlightIndex}` +
        ` SEQUENCE: ${memorizationSequence}`
    );
  }

  const levelAndCurrentHighlightIndex = `${gameStatus.level}${currentHighlightIndex}`;
  useEffect(() => {
    if (
      typeof fragmentToHighlightIndex !== "number"
    ) {
      return;
    }

    let nextHighLightIndex =
      currentHighlightIndex + 1;
    if (
      nextHighLightIndex ===
      memorizationSequence.length
    ) {
      nextHighLightIndex = 0;
    }

    setTimeout(() => {
      fragmentsGrid[fragmentToHighlightIndex!] =
        MemorizationFragment({
          isActive: false,
          key: fragmentToHighlightIndex!,
        });
      setCurrentFragmentIndex(nextHighLightIndex);
      if (nextHighLightIndex === 0) {
        setIsHighlightingCompleted(true);
      }
    }, 1000);
  }, [levelAndCurrentHighlightIndex]);

  return { fragmentsGrid };
}
