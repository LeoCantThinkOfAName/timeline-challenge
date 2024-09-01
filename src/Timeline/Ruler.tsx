import { ChangeEvent, forwardRef, useCallback, useMemo } from "react";
import { TIMELINE_MAX_DURATION, TIMELINE_STEP } from "../constants";

import { useTimelineStore } from "./Store";

type RulerProps = {};

export const Ruler = forwardRef<HTMLDivElement, RulerProps>((_props, ref) => {
  const time = useTimelineStore.use.time();
  const duration = useTimelineStore.use.duration();
  const setTime = useTimelineStore.use.setTime();
  const sharedStyle = useMemo(
    () => ({
      style: {
        width: `${duration}px`,
      },
    }),
    [duration],
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setTime(Number(e.currentTarget.value)),
    [setTime],
  );

  return (
    <div
      ref={ref}
      className="px-4 py-2 min-w-0 
      border-b border-solid border-gray-700 
      overflow-x-auto overflow-y-hidden"
      data-testid="ruler"
    >
      <div className="h-6 rounded-md bg-white/25" {...sharedStyle}>
        <input
          {...sharedStyle}
          className="h-full opacity-0 appearance-none"
          type="range"
          step={TIMELINE_STEP}
          max={duration}
          onChange={onChange}
          defaultValue={time}
        />
      </div>
    </div>
  );
});

Ruler.defaultProps = {
  duration: TIMELINE_MAX_DURATION,
  time: 0,
} as RulerProps;
