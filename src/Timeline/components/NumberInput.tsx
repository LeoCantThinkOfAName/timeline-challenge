import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  KEYCODE_MAP,
  TIMELINE_MAX_DURATION,
  TIMELINE_STEP,
} from "../../constants";

import { getRoundedTime } from "../../utils";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onComplete: (val: number) => void;
  defaultValue: number;
  min: number;
  max: number;
  value: number;
}

const validVal = (val: number, min: number, max: number) => {
  let finalVal = val;
  // if number is not mutiply of step
  if (finalVal % TIMELINE_STEP > 0) {
    finalVal = getRoundedTime(val);
  }
  // if number is larger than maximum
  if (finalVal > max) finalVal = max;
  // if number is smaller than minimum
  if (finalVal < min) finalVal = min;
  return finalVal;
};

const onFocus = (e: FocusEvent<HTMLInputElement>) => e.currentTarget.select();

export const NumberInput = ({
  min,
  max,
  value,
  defaultValue,
  onComplete,
  ...props
}: NumberInputProps) => {
  const storedValue = useRef<number>(defaultValue);
  const [localVal, setLocalVal] = useState<string>(defaultValue.toString());

  const complete = useCallback(() => {
    const val = validVal(storedValue.current, min, max);
    setLocalVal(val.toString());
    onComplete(val);
  }, [onComplete, setLocalVal]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLocalVal(e.currentTarget.value);
  const onBlur = () => complete();

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const { currentTarget, code } = e;
    switch (code) {
      case KEYCODE_MAP.Enter:
        // when press ENTER, lose focus
        storedValue.current = Number(currentTarget.value);
        currentTarget.blur();
        break;
      case KEYCODE_MAP.Escape:
        // when press ESC, restore the input to the last valid value and lose focus
        setLocalVal(storedValue.current.toString());
        currentTarget.blur();
        break;
      case KEYCODE_MAP.ArrowUp:
      case KEYCODE_MAP.ArrowDown:
        // select the entire value when user press arrow up/arrow down
        storedValue.current = Number(currentTarget.value);
        complete();
        currentTarget.select();
    }
  };

  const onMouseUp = (e: MouseEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    currentTarget.select();
    const val = Number(currentTarget.value);
    storedValue.current = val;
    complete();
  };

  // assign value to localVal if user set time at ruler
  useEffect(() => {
    setLocalVal(value.toString());
    storedValue.current = value;
  }, [value]);
  // update time and playhead pos when duration change
  useEffect(() => {
    setLocalVal((prev) => {
      let finalVal = prev;
      if (Number(prev) > max) {
        finalVal = max.toString();
        storedValue.current = max;
      }
      if (Number(prev) < min) {
        finalVal = min.toString();
        storedValue.current = min;
      }
      complete();
      return finalVal;
    });
  }, [min, max, setLocalVal]);

  return (
    <input
      className="bg-gray-700 px-1 rounded"
      type="number"
      min={min}
      max={max}
      value={localVal}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      onMouseUp={onMouseUp}
      {...props}
    />
  );
};

NumberInput.defaultProps = {
  min: 0,
  max: TIMELINE_MAX_DURATION,
  defaultValue: 0,
  step: TIMELINE_STEP,
} as NumberInputProps;
