import {
  useState,
  type FC,
  useEffect,
  useContext,
} from "react";
import {
  type NodeProps,
  PickStatus,
  type ComponentProps,
} from "./types";
import { ProgressbarIndicatorStatus } from "../../ProgressBar/ProgressBar";
import "./PickingButton.css";
import { GameContext } from "../../GameContext/context";

const PickingButton: FC<ComponentProps> = ({
  buttonIndex,
  pickingPanelContext,
}) => {
  const [pickStatus, setPickStatus] = useState(
    PickStatus.NOT_PICKED
  );
  const { memorizationSequenceRef } =
    useContext(GameContext);

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
      currentPickIndexRef,
      lastPickStatusRef,
      incrementCurrentPickIndex,
      resetPickedSequence,
      expandProgressbar,
    } = pickingPanelContext;

    const isRightPick =
      memorizationSequenceRef.current[
        currentPickIndexRef.current
      ] === buttonIndex;
    lastPickStatusRef.current = {
      isRightPick,
      fragmentIndex: buttonIndex,
    };

    if (isRightPick) {
      setPickStatus(PickStatus.SUCCESS);
      expandProgressbar(
        ProgressbarIndicatorStatus.SUCCESS
      );

      if (
        currentPickIndexRef.current + 1 ===
        memorizationSequenceRef.current.length
      ) {
        resetPickedSequence();
      } else {
        incrementCurrentPickIndex();
      }
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
