import { DEFAULT_TRACKS } from "../constants";

export const TrackList = () => {
  // TODO: implement scroll sync with `KeyframeList`

  return (
    <div
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
};
