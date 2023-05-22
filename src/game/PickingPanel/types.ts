import type { ProgressbarIndicatorStatus } from "../ProgressBar/ProgressBar";

type Callback = () => void;

export type PickingPanelContext = {
  memorizationSequence: number[];

  isPickingBlockedRef: React.MutableRefObject<boolean>;
  blockPicking: Callback;
  unblockPicking: Callback;

  currentPickIndexRef: React.MutableRefObject<number>;
  lastPickedFragmentIndexRef: React.MutableRefObject<
    number | null
  >;
  resetCurrentPickIndex: Callback;
  incrementCurrentPickIndex: Callback;

  resetPickedSequence: Callback;
  resetPickButton: Record<number, Callback>;
  resetProgressbar: Callback;
  expandProgressbar: (
    indicatorStatus: ProgressbarIndicatorStatus
  ) => void;
};
