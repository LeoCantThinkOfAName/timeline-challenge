import { KeyframeList } from "./KeyframeList";
import { PlayControls } from "./PlayControls";
import { Playhead } from "./Playhead";
import { Ruler } from "./Ruler";
import { TrackList } from "./TrackList";
import { useRef } from "react";
import { useSyncScroll } from "../hooks/useSyncScroll";

export const Timeline = () => {
  const rulerRef = useRef<HTMLDivElement>(null);
  const keyframeRef = useRef<HTMLDivElement>(null);
  const trackListRef = useRef<HTMLDivElement>(null);
  useSyncScroll([rulerRef, keyframeRef], "X");
  useSyncScroll([keyframeRef, trackListRef], "Y");

  return (
    <div
      className="relative h-[300px] w-full grid grid-cols-[300px_1fr] grid-rows-[40px_1fr] 
    bg-gray-800 border-t-2 border-solid border-gray-700 overflow-hidden"
      data-testid="timeline"
    >
      <PlayControls />
      <Ruler ref={rulerRef} />
      <TrackList ref={trackListRef} />
      <KeyframeList ref={keyframeRef} />
      <Playhead />
    </div>
  );
};
