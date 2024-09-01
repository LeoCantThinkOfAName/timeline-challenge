import { TIMELINE_STEP } from "../constants";

export const getRoundedTime = (value: number): number => {
  return Math.round(value / TIMELINE_STEP) * TIMELINE_STEP;
};
