import type { ProgressbarIndicatorStatus } from "../ProgressBar/ProgressBar";

export type PickingPanelContext = {
  pickingSequence: number[];
  pickingIndexRef: React.MutableRefObject<number>;
  lastPickedFragmentRef: React.MutableRefObject<
    number | null
  >;
  resetPickedSequence: () => void;
  resetPickButton: Record<number, () => void>;
  expandProgressbar: (
    indicatorStatus: ProgressbarIndicatorStatus
  ) => void;
};
