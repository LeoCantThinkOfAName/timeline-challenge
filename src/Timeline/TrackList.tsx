import { DEFAULT_TRACKS } from "../constants";
import { forwardRef } from "react";

type TrackListProps = {};

export const TrackList = forwardRef<HTMLDivElement, TrackListProps>(
  (_props, ref) => {
    return (
      <div
        ref={ref}
        className="grid grid-flow-row auto-rows-[40px]
      border-r border-solid border-r-gray-700 
      overflow-auto"
        data-testid="track-list"
      >
        {DEFAULT_TRACKS.map((trackTitle) => (
          <div className="p-2" key={trackTitle}>
            <div>{trackTitle}</div>
          </div>
        ))}
      </div>
    );
  },
);
