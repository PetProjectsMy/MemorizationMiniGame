import {
  useState,
  type FC,
  useEffect,
} from "react";
import "./PickingButton.css";
import {
  type NodeProps,
  PickStatus,
  type ComponentProps,
} from "./types";
import { ProgressbarIndicatorStatus } from "../../ProgressBar/ProgressBar";
const PickingButton: FC<ComponentProps> = ({
  buttonIndex,
  pickingPanelContext,
  disabled = false,
  initPickStatus = PickStatus.NOT_PICKED,
}) => {
  const [pickStatus, setPickStatus] = useState(
    initPickStatus
  );
  const {
    pickingSequence,
    pickingIndexRef,
    lastPickedFragmentRef,
    resetPickedSequence,
    expandProgressbar,
  } = pickingPanelContext;

  useEffect(
    () =>
      (pickingPanelContext.resetPickButton[
        buttonIndex
      ] = () =>
        setPickStatus(PickStatus.NOT_PICKED)),
    []
  );

  let className = "game__picking-button";
  if (pickStatus === PickStatus.SUCCESS) {
    className += " game__picking-button_success";
  } else if (pickStatus === PickStatus.ERROR) {
    className += " game__picking-button_error";
  }

  const props: NodeProps = {
    className,
  };

  const fragmentToPick =
    pickingSequence[pickingIndexRef.current];
  props.onClick = (event) => {
    // TODO
    if (!fragmentToPick) {
      return;
    }

    if (pickStatus === PickStatus.SUCCESS) {
      return;
    }

    lastPickedFragmentRef.current = buttonIndex;
    const isRightPick =
      fragmentToPick === buttonIndex;
    if (isRightPick) {
      setPickStatus(PickStatus.SUCCESS);
      expandProgressbar(
        ProgressbarIndicatorStatus.SUCCESS
      );
    } else {
      setPickStatus(PickStatus.ERROR);
      expandProgressbar(
        ProgressbarIndicatorStatus.ERROR
      );
      resetPickedSequence();
    }
  };

  return (
    <button
      {...props}
      disabled={disabled}
    ></button>
  );
};

export default PickingButton;
