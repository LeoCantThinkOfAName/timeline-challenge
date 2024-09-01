import { TIMELINE_MAX_DURATION, TIMELINE_MIN_DURATION } from "../constants";

import { NumberInput } from "./components/NumberInput";
import { useTimelineStore } from "./Store";

type PlayControlsProps = {};

export const PlayControls = (_props: PlayControlsProps) => {
  // TODO: move these state into input component to further reduce rerender times
  const time = useTimelineStore.use.time();
  const duration = useTimelineStore.use.duration();
  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 
 px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <NumberInput data-testid="time" defaultValue={0} value={time} />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <NumberInput
          min={TIMELINE_MIN_DURATION}
          max={TIMELINE_MAX_DURATION}
          defaultValue={TIMELINE_MAX_DURATION}
          data-testid="max-time"
          value={duration}
        />
        Duration
      </fieldset>
    </div>
  );
};
