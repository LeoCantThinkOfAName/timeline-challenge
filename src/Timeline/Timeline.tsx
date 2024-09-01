import { useRef, useState } from "react";

import { KeyframeList } from "./KeyframeList";
import { PlayControls } from "./PlayControls";
import { Playhead } from "./Playhead";
import { Ruler } from "./Ruler";
import { TIMELINE_MAX_DURATION } from "../constants";
import { TrackList } from "./TrackList";
import { useSyncScroll } from "../hooks/useSyncScroll";

export const Timeline = () => {
  // FIXME: performance concerned
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(TIMELINE_MAX_DURATION);
  const rulerRef = useRef<HTMLDivElement>(null);
  const keyframeRef = useRef<HTMLDivElement>(null);
  useSyncScroll([rulerRef, keyframeRef], "X");

  return (
    <div
      className="relative h-[300px] w-full grid grid-cols-[300px_1fr] grid-rows-[40px_1fr] 
    bg-gray-800 border-t-2 border-solid border-gray-700"
      data-testid="timeline"
    >
      <PlayControls
        time={time}
        setTime={setTime}
        duration={duration}
        setDuration={setDuration}
      />
      <Ruler ref={rulerRef} duration={duration} setTime={setTime} time={time} />
      <TrackList />
      <KeyframeList ref={keyframeRef} duration={duration} />
      <Playhead time={time} />
    </div>
  );
};
