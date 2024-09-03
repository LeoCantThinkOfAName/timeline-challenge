import { TIMELINE_MAX_DURATION, TIMELINE_MIN_DURATION } from "../constants";

import { NumberInput } from "./NumberInput";
import { useTimelineStore } from "./Timeline.store";

type PlayControlsProps = {};

export const PlayControls = (_props: PlayControlsProps) => {
  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 
 px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <CurrentInput />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <DurationInput />
        Duration
      </fieldset>
    </div>
  );
};

const CurrentInput = () => {
  const time = useTimelineStore.use.time();
  const duration = useTimelineStore.use.duration();
  const setTime = useTimelineStore.use.setTime();

  return (
    <NumberInput
      defaultValue={time}
      value={time}
      min={0}
      max={duration}
      data-testid="time"
      onComplete={setTime}
    />
  );
};

const DurationInput = () => {
  const duration = useTimelineStore.use.duration();
  const setDuration = useTimelineStore.use.setDuration();

  return (
    <NumberInput
      defaultValue={duration}
      value={duration}
      min={TIMELINE_MIN_DURATION}
      max={TIMELINE_MAX_DURATION}
      data-testid="max-time"
      onComplete={setDuration}
    />
  );
};
