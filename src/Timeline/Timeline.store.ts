import { TIMELINE_MAX_DURATION } from "../constants";
import { create } from "zustand";
import { createSelectors } from "../utils";
import { devtools } from "zustand/middleware";

export interface TimelineState {
  duration: number;
  time: number;
  offset: number;
  setDuration: (val: number) => void;
  setTime: (val: number) => void;
  setOffset: (val: number) => void;
}

const useTimelineStoreBase = create<TimelineState>()(
  devtools(
    (set, _get) => ({
      duration: TIMELINE_MAX_DURATION,
      time: 0,
      offset: 0,
      setDuration: (duration: number) =>
        set({ duration }, false, { type: "timeline/setDuration" }),
      setTime: (time: number) =>
        set({ time }, false, { type: "timeline/setTime" }),
      setOffset: (offset: number) =>
        set({ offset }, false, { type: "timeline/setOffset" }),
    }),
    {
      name: "TimelineStore",
    },
  ),
);

export const useTimelineStore = createSelectors(useTimelineStoreBase);
