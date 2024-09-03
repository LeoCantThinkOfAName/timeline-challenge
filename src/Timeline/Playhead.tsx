import { useTimelineStore } from "./Timeline.store";

type PlayheadProps = {};

export const Playhead = (_props: PlayheadProps) => {
  const offset = useTimelineStore.use.offset();
  const time = useTimelineStore.use.time();
  const hidden = offset > time;

  return (
    <div
      hidden={hidden}
      className="absolute left-[316px] h-full border-l-2 border-solid border-yellow-600 z-10"
      data-testid="playhead"
      style={{ transform: `translateX(calc(${time - offset}px - 50%))` }}
    >
      <div className="absolute border-solid border-[5px] border-transparent border-t-yellow-600 -translate-x-1.5" />
    </div>
  );
};
