import { useMemo } from "react";

const vacantFragmentsSet = new Set([
  ...Array(9).keys(),
]);

export function useMemorizationSequence() {
  const memorizationSequence: number[] = useMemo(
    () => [],
    []
  );

  const getSequence = () => memorizationSequence;
  const expandSequence = (newLength?: number) => {
    if (
      typeof newLength !== "number" ||
      newLength <= memorizationSequence.length
    ) {
      return;
    }

    const randomFragment = [
      ...vacantFragmentsSet,
    ][
      Math.floor(
        Math.random() * vacantFragmentsSet.size
      )
    ];

    memorizationSequence.push(randomFragment);
    console.log(
      `NEXT SEQUENCE: ${JSON.stringify(
        memorizationSequence
      )}`
    );
    vacantFragmentsSet.delete(randomFragment);
  };

  return {
    getSequence,
    expandSequence,
  };
}
