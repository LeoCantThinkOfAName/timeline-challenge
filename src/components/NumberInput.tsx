import {
  FC,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  KEYCODE_MAP,
  TIMELINE_MAX_DURATION,
  TIMELINE_STEP,
} from "../constants";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultValue: number;
  onInputChange: (value: number) => void;
}

export const NumberInput: FC<NumberInputProps> = ({
  onInputChange,
  min,
  max,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const storedValue = useRef<number>(props.defaultValue);

  const storeAndSet = useCallback(
    (value: number) => {
      onInputChange(value);
      storedValue.current = value;
      if (inputRef.current) inputRef.current.value = String(value);
    },
    [onInputChange],
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
          e.currentTarget.select();
          storeAndSet(Number(e.currentTarget.value));
          break;
      }
    },
    [onInputChange],
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
        finalVal = Number(min);
      } else if (num > Number(max)) {
        finalVal = Number(max);
      } else {
        // rounded the value to the times of the given step config
        finalVal = Math.round(num / TIMELINE_STEP) * TIMELINE_STEP;
      }
      storeAndSet(finalVal);
    },
    [onInputChange, max, min],
  );

  const onFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  }, []);

  const onMouseUp = useCallback((e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
    storeAndSet(Number(e.currentTarget.value));
  }, []);

  useEffect(() => {
    // if min/max changed and the value is out of range, set the value to the upper or lower bound
    const [maxV, minV] = [Number(max), Number(min)];
    if (storedValue.current > maxV) {
      storeAndSet(maxV);
    } else if (storedValue.current < minV) {
      storeAndSet(minV);
    }
  }, [max, min]);

  return (
    <input
      ref={inputRef}
      className="bg-gray-700 px-1 rounded"
      type="number"
      step={TIMELINE_STEP}
      onMouseUp={onMouseUp}
      onKeyUp={onKeyUp}
      onFocus={onFocus}
      onBlur={onBlur}
      min={min}
      max={max}
      {...props}
    />
  );
};

NumberInput.defaultProps = {
  min: 0,
  max: TIMELINE_MAX_DURATION,
  defaultValue: 0,
} as NumberInputProps;
