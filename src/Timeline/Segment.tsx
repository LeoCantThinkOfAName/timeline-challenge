import { TIMELINE_MAX_DURATION } from "../constants";

type SegmentProps = {
  duration?: number;
};

export const Segment = ({ duration }: SegmentProps) => {
  // TODO: resize based on time
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
