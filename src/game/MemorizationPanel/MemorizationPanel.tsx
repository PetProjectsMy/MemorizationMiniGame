import { FC, memo } from "react";
import "./MemorizationPanel.css";
import ProgressBar, {
  ProgressbarIndicatorStatus,
} from "../ProgressBar/ProgressBar";
import { useFragmentsHighlighting } from "./useFragmentsHighlighting";

type Props = {
  fragmentsToMemorize: null | number[];
};

const MemorizationPanel: FC<Props> = ({
  fragmentsToMemorize,
}) => {
  const { fragmentsGrid } =
    useFragmentsHighlighting({
      fragmentsToMemorize,
    });
  const indicatorsStatuses = fragmentsToMemorize
    ? Array(fragmentsToMemorize?.length).fill(
        ProgressbarIndicatorStatus.SUCCESS
      )
    : [];

  return (
    <div className="game__puzzle-panel">
      <ProgressBar
        indicatorsStatuses={indicatorsStatuses}
      />
      <div className="game__memorization-panel">
        {fragmentsGrid}
      </div>
    </div>
  );
};

export default memo(MemorizationPanel);
