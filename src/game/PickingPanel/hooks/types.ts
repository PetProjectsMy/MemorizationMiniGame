import type { PickingPanelContext } from '../types';

export type WithPickingPanelContextArgs<Args = {}> = {
  pickingPanelContext: PickingPanelContext;
} & Args;
