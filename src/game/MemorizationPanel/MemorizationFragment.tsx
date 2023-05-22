import classNames from "classnames";
import { type FC } from "react";

type Props = {
  isActive?: boolean;
  key: number;
};

export const MemorizationFragment: FC<Props> = ({
  isActive = false,
  key,
}) => {
  return (
    <div
      className={classNames(
        "game__memorization-fragment",
        {
          "game__memorization-fragment_active":
            isActive,
        }
      )}
      key={key}
    ></div>
  );
};
