import { ChangeEvent, forwardRef, useCallback, useMemo } from "react";
import { TIMELINE_MAX_DURATION, TIMELINE_STEP } from "../constants";

type RulerProps = {
  duration?: number;
  setTime: (time: number) => void;
  time: number;
};

export const Ruler = forwardRef<HTMLDivElement, RulerProps>(
  ({ duration, setTime, time }, ref) => {
    // TODO: implement mousedown and mousemove to update time and Playhead position
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
  },
);

Ruler.defaultProps = {
  duration: TIMELINE_MAX_DURATION,
  time: 0,
} as RulerProps;
