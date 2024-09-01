import { DEFAULT_TRACKS, TIMELINE_MAX_DURATION } from "../constants";

import { Segment } from "./Segment";
import { forwardRef } from "react";

type KeyframeListProps = {
  duration?: number;
};

export const KeyframeList = forwardRef<HTMLDivElement, KeyframeListProps>(
  ({ duration }, ref) => {
    return (
      <div
        ref={ref}
        className="px-4 min-w-0 overflow-auto"
        data-testid="keyframe-list"
      >
        {DEFAULT_TRACKS.map((trackTitle) => (
          <Segment duration={duration} key={trackTitle} />
        ))}
      </div>
    );
  },
);

KeyframeList.defaultProps = {
  duration: TIMELINE_MAX_DURATION,
} as KeyframeListProps;
