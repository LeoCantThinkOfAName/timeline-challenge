import { DEFAULT_TRACKS } from "../constants";
import { Segment } from "./Segment";
import { forwardRef } from "react";

type KeyframeListProps = {};

export const KeyframeList = forwardRef<HTMLDivElement, KeyframeListProps>(
  (_props, ref) => {
    return (
      <div
        ref={ref}
        className="px-4 min-w-0 overflow-auto"
        data-testid="keyframe-list"
      >
        {DEFAULT_TRACKS.map((trackTitle) => (
          <Segment key={trackTitle} />
        ))}
      </div>
    );
  },
);

KeyframeList.defaultProps = {} as KeyframeListProps;
