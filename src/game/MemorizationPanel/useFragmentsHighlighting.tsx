import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { MemorizationFragment } from "./MemorizationFragment";

type Args = {
  fragmentsToMemorize: null | number[];
};

export function useFragmentsHighlighting({
  fragmentsToMemorize,
}: Args) {
  const [
    currentFragmentIndex,
    setCurrentFragmentIndex,
  ] = useState(0);

  const fragmentsGrid = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, index) =>
        MemorizationFragment({ key: index })
      ),
    []
  );

  let fragmentToMemorize: number | undefined;
  if (fragmentsToMemorize) {
    fragmentToMemorize =
      fragmentsToMemorize[currentFragmentIndex];

    fragmentsGrid[fragmentToMemorize] =
      MemorizationFragment({
        isActive: true,
        key: fragmentToMemorize,
      });
  }

  useEffect(() => {
    if (typeof fragmentToMemorize !== "number") {
      return;
    }

    setTimeout(() => {
      fragmentsGrid[fragmentToMemorize!] =
        MemorizationFragment({
          isActive: false,
          key: fragmentToMemorize!,
        });
      setCurrentFragmentIndex(
        currentFragmentIndex + 1
      );
    }, 1000);
  }, [currentFragmentIndex]);

  return { fragmentsGrid };
}
