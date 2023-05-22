import { useEffect, useRef } from "react";
import type { WithPickingPanelContextArgs } from "./types";

export function usePickStatus({
  pickingPanelContext,
}: WithPickingPanelContextArgs) {
  const currentPickIndexRef = useRef<number>(0);
  const lastPickedFragmentIndexRef = useRef<
    number | null
  >(null);

  useEffect(() => {
    const resetCurrentPickIndex = () => {
      currentPickIndexRef.current = 0;
    };

    const incrementCurrentPickIndex = () => {
      currentPickIndexRef.current++;
    };

    Object.assign(pickingPanelContext, {
      resetCurrentPickIndex,
      incrementCurrentPickIndex,
      currentPickIndexRef,
      lastPickedFragmentIndexRef,
    });
  }, []);
}
