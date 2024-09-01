import { TIMELINE_MAX_DURATION } from "../constants";
import { create } from "zustand";
import { createSelectors } from "../utils";

interface TimelineState {
  duration: number;
  time: number;
  offset: number;
  setDuration: (val: number) => void;
  setTime: (val: number) => void;
  setOffset: (val: number) => void;
}

const useTimelineStoreBase = create<TimelineState>((set, _get) => ({
  duration: TIMELINE_MAX_DURATION,
  time: 0,
  offset: 0,
  setDuration: (duration: number) => set({ duration }, false),
  setTime: (time: number) => set({ time }, false),
  setOffset: (offset: number) => set({ offset }, false),
}));

export const useTimelineStore = createSelectors(useTimelineStoreBase);
