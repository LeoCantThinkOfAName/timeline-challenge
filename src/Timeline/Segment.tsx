import { TIMELINE_MAX_DURATION } from "../constants";
import { useTimelineStore } from "./Timeline.store";

type SegmentProps = {};

export const Segment = (_props: SegmentProps) => {
  const duration = useTimelineStore.use.duration();

  return (
    <div
      className="py-2"
      style={{ width: `${duration}px` }}
      data-testid="segment"
    >
      <div className="h-6 rounded-md bg-white/10"></div>
    </div>
  );
};

Segment.defaultProps = {
  duration: TIMELINE_MAX_DURATION,
} as SegmentProps;
