import { useEffect, useRef } from "react";
import type { WithPickingPanelContextArgs } from "./types";

type Args = {
  isPickingBlockedInitValue: boolean;
};

export function usePickingBlock({
  isPickingBlockedInitValue,
  pickingPanelContext,
}: WithPickingPanelContextArgs<Args>) {
  const isPickingBlockedRef = useRef(
    isPickingBlockedInitValue
  );

  useEffect(() => {
    const blockPicking = () => {
      isPickingBlockedRef.current = true;
    };

    const unblockPicking = () => {
      isPickingBlockedRef.current = false;
    };

    Object.assign(pickingPanelContext, {
      isPickingBlockedRef,
      blockPicking,
      unblockPicking,
    });
  }, []);
}
