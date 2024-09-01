import { TIMELINE_MAX_DURATION, TIMELINE_MIN_DURATION } from "../constants";

import { NumberInput } from "../components/NumberInput";
import { useCallback } from "react";

type PlayControlsProps = {
  time: number;
  duration: number;
  setTime: (time: number) => void;
  setDuration: (time: number) => void;
};

export const PlayControls = ({
  setTime,
  time,
  duration,
  setDuration,
}: PlayControlsProps) => {
  const onDurationChange = useCallback((value: number) => {
    setDuration(value);
  }, []);

  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 
 px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <NumberInput
          onInputChange={setTime}
          defaultValue={time}
          data-testid="time"
          max={duration}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <NumberInput
          onInputChange={onDurationChange}
          min={TIMELINE_MIN_DURATION}
          max={TIMELINE_MAX_DURATION}
          defaultValue={duration}
          data-testid="max-time"
        />
        Duration
      </fieldset>
    </div>
  );
};
