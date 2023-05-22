import type { WritableDraft } from "immer/dist/types/types-external";
import { MemorizationGameState } from "./types";

const vacantFragmentsSet = new Set([
  ...Array(9).keys(),
]);

function getNextMemorizationFragment() {
  const randomFragment = [...vacantFragmentsSet][
    Math.floor(
      Math.random() * vacantFragmentsSet.size
    )
  ];

  vacantFragmentsSet.delete(randomFragment);

  return randomFragment;
}

export const expandPickingSequenceReducer = (
  state: WritableDraft<MemorizationGameState>
) => {
  const nextFragment =
    getNextMemorizationFragment();
  state.memorizationSequence.push(nextFragment);

  console.log(
    `NEXT SEQUENCE: ${JSON.stringify(
      state.memorizationSequence
    )}`
  );
};
