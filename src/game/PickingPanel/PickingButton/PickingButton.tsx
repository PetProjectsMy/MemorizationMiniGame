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
}) => {
  const [pickStatus, setPickStatus] = useState(
    PickStatus.NOT_PICKED
  );

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

  props.onClick = (event) => {
    const { isPickingBlockedRef } =
      pickingPanelContext;
    if (
      pickStatus === PickStatus.SUCCESS ||
      isPickingBlockedRef.current
    ) {
      return;
    }

    const {
      memorizationSequence,
      currentPickIndexRef,
      lastPickedFragmentIndexRef,
      resetPickedSequence,
      expandProgressbar,
    } = pickingPanelContext;

    lastPickedFragmentIndexRef.current =
      buttonIndex;
    const isRightPick =
      memorizationSequence[
        currentPickIndexRef.current
      ] === buttonIndex;

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

  return <button {...props}></button>;
};

export default PickingButton;
