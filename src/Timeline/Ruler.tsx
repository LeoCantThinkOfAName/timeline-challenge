import { ChangeEvent, RefObject, forwardRef, useEffect, useMemo } from "react";
import { TIMELINE_MAX_DURATION, TIMELINE_STEP } from "../constants";

import { useTimelineStore } from "./Timeline.store";

type RulerProps = {};

export const Ruler = forwardRef<HTMLDivElement, RulerProps>((_props, ref) => {
  const time = useTimelineStore.use.time();
  const duration = useTimelineStore.use.duration();
  const setTime = useTimelineStore.use.setTime();
  const setOffset = useTimelineStore.use.setOffset();
  const sharedStyle = useMemo(
    () => ({
      style: {
        width: `${duration}px`,
      },
    }),
    [duration],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTime(Number(e.currentTarget.value));
  const scrollListener = (e: Event) =>
    setOffset((e.target as HTMLDivElement).scrollLeft);

  useEffect(() => {
    const inputRef = ref as RefObject<HTMLDivElement | null>;
    inputRef.current?.addEventListener("scroll", scrollListener);
    return () => {
      inputRef.current?.removeEventListener("scroll", scrollListener);
    };
  }, []);

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
