import { NumberInput } from "../components/NumberInput";

type PlayControlsProps = {
  time: number;
  setTime: (time: number) => void;
};

export const PlayControls = ({ setTime }: PlayControlsProps) => {
  // TODO: implement time <= maxTime

  // const onTimeChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setTime(Number(e.target.value));
  //   },
  //   [setTime],
  // );

  // const onInputFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
  //   e.target.select();
  // }, []);

  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 
 px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        {/* <input
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="time"
          min={0}
          max={2000}
          step={10}
          value={time}
        /> */}
        <NumberInput setTime={setTime} defaultValue={0} data-testid="time" />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        {/* <input
          className="bg-gray-700 px-1 rounded"
          type="number"
          data-testid="max-time"
          min={100}
          max={2000}
          step={10}
          defaultValue={2000}
        /> */}
        <NumberInput
          setTime={() => {}}
          defaultValue={2000}
          data-testid="max-time"
        />
        Duration
      </fieldset>
    </div>
  );
};
