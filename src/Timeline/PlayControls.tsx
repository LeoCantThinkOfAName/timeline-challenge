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
        {/* <input
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="time"
          min={0}
          max={2000}
          step={10}
          value={time}
        /> */}
        <NumberInput
          onInputChange={setTime}
          defaultValue={time}
          data-testid="time"
          max={duration}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        {/* <input
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="max-time"
          min={100}
          max={2000}
          step={10}
          defaultValue={2000}
        /> */}
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
