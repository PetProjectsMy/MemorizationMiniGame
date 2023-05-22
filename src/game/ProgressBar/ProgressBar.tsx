import classNames from "classnames";
import { type FC, useMemo, memo } from "react";
import "./ProgressBar.css";

export const enum ProgressbarIndicatorStatus {
  SUCCESS,
  ERROR,
  NEUTRAL,
}
const mapProgressbarIndicatorStatusToClassName: Record<
  ProgressbarIndicatorStatus,
  string
> = {
  [ProgressbarIndicatorStatus.SUCCESS]:
    "game__progressbar-indicator_success",
  [ProgressbarIndicatorStatus.ERROR]:
    "game__progressbar-indicator_error",
  [ProgressbarIndicatorStatus.NEUTRAL]:
    "game__progressbar-indicator_neutral",
};

type Props = {
  indicatorsStatuses?: ProgressbarIndicatorStatus[];
};

const ProgressBar: FC<Props> = ({
  indicatorsStatuses = [],
}) => {
  const progressbarIndicators = Array.from({
    length: 5,
  }).map((_, index) => {
    const indicatorStatus =
      indicatorsStatuses[index] ??
      ProgressbarIndicatorStatus.NEUTRAL;

    return (
      <div
        className={classNames(
          "game__progressbar-indicator",
          mapProgressbarIndicatorStatusToClassName[
            indicatorStatus
          ]
        )}
        key={index}
      ></div>
    );
  });

  return (
    <div className="game__progressbar">
      {progressbarIndicators}
    </div>
  );
};

export default memo(ProgressBar);
