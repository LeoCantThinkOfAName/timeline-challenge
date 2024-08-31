import {
  FC,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useRef,
} from "react";
import {
  KEYCODE_MAP,
  TIMELINE_MAX_DURATION,
  TIMELINE_STEP,
} from "../constants";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  setTime: (time: number) => void;
  defaultValue: number;
}

export const NumberInput: FC<NumberInputProps> = ({ setTime, ...props }) => {
  const storedValue = useRef<number>(props.defaultValue);

  const storeAndSet = useCallback(
    (value: number) => {
      setTime(value);
      storedValue.current = value;
    },
    [setTime],
  );

  const onKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.code) {
        case KEYCODE_MAP.Enter:
          // when press ENTER, lose focus
          e.currentTarget.blur();
          break;
        case KEYCODE_MAP.Escape:
          // when press ESC, restore the input to the last valid value and lose focus
          e.currentTarget.value = String(storedValue.current);
          e.currentTarget.blur();
          break;
        case KEYCODE_MAP.ArrowUp:
        case KEYCODE_MAP.ArrowDown:
          // select the entire value when user press arrow up/arrow down
          storeAndSet(Number(e.currentTarget.value));
          break;
      }
    },
    [setTime],
  );

  const onBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      let finalVal: number;
      // when input lose focus, set the value
      const { value } = e.currentTarget;
      const num = Number(value);
      if (!value) {
        // safe guard if no value is given
        finalVal = storedValue.current;
        e.currentTarget.value = String(finalVal);
        return;
      } else if (isNaN(num)) {
        // if value is invalid, restore the input to the last valid value
        e.currentTarget.value = String(storedValue);
        return;
      } else if (num < 0) {
        // if number is nagative, set it as minimum allowed number
        finalVal = Number(props.min ?? "0");
        e.currentTarget.value = String(finalVal);
      } else if (num > Number(props.max)) {
        finalVal = Number(props.max);
        e.currentTarget.value = String(finalVal);
        storedValue.current = Number(finalVal);
      } else {
        // rounded the value to the times of the given step config
        finalVal = Math.round(num / TIMELINE_STEP) * TIMELINE_STEP;
        e.currentTarget.value = String(finalVal);
        storedValue.current = finalVal;
      }
      storeAndSet(finalVal);
    },
    [setTime],
  );

  const onFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  }, []);

  const onMouseUp = useCallback((e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
    storeAndSet(Number(e.currentTarget.value));
  }, []);

  return (
    <input
      className="bg-gray-700 px-1 rounded"
      type="number"
      step={TIMELINE_STEP}
      onMouseUp={onMouseUp}
      onKeyUp={onKeyUp}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    />
  );
};

NumberInput.defaultProps = {
  min: 0,
  max: TIMELINE_MAX_DURATION,
  defaultValue: 0,
} as NumberInputProps;
