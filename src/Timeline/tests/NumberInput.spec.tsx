import { cleanup, render, screen } from "@testing-library/react";

import { NumberInput } from "../NumberInput";
import userEvent from "@testing-library/user-event";

const onCompleteSpy = jest.fn();
const props = {
  min: 10,
  max: 100,
  step: 10,
  value: 50,
  defaultValue: 10,
  onComplete: onCompleteSpy,
  "data-testid": "input",
};
const getInput = (testId = "input"): Promise<HTMLInputElement> =>
  screen.findByTestId(testId);
describe("NumberInput", () => {
  beforeEach(() => render(<NumberInput {...props} />));

  afterEach(() => {
    cleanup();
  });
  it("should render", async () => {
    const input = await getInput();
    expect(input).toBeInTheDocument();
  });

  it("should lose focus when enter/esc", async () => {
    const input = await getInput();
    input.focus();
    await userEvent.keyboard("[enter]");
    expect(document.activeElement).not.toBe(input);
    input.focus();
    await userEvent.keyboard("[escape]");
    expect(document.activeElement).not.toBe(input);
  });

  it("should update the value", async () => {
    const input = await getInput();
    await userEvent.type(input, "100");
    expect(input).toHaveValue(100);
  });

  it("should resume last value if press ESC", async () => {
    const input = await getInput();
    input.focus();
    await userEvent.keyboard("60[enter]");
    expect(input).toHaveValue(60);
    await userEvent.keyboard("80[escape]");
    expect(input).toHaveValue(60);
  });

  it("should return min/max value if input is out of designated range", async () => {
    const input = await getInput();
    input.focus();
    await userEvent.keyboard("-100{enter}");
    expect(input).toHaveValue(props.min);
    input.focus();
    await userEvent.keyboard("1000{enter}");
    expect(input).toHaveValue(props.max);
  });

  it("should not accept non-numeric value", async () => {
    const input = await getInput();
    input.focus();
    await userEvent.keyboard("ABC[enter]");
    expect(input).toHaveValue(50);
  });

  it("should set value to the upperbound if current value is larger than new max", async () => {
    cleanup();
    const { rerender } = render(<NumberInput {...props} />);
    const input = await getInput();
    expect(input).toHaveValue(50);
    rerender(<NumberInput {...props} max={10} />);
    expect(input).toHaveValue(10);
  });

  it("should set value to the lowerbound if current value is lower than new min", async () => {
    cleanup();
    const { rerender } = render(<NumberInput {...props} />);
    const input = await getInput();
    expect(input).toHaveValue(50);
    rerender(<NumberInput {...props} min={80} />);
    expect(input).toHaveValue(80);
  });

  it("should round the value to the multiple of step", async () => {
    const input = await getInput();
    input.focus();
    await userEvent.keyboard("51[enter]");
    expect(input).toHaveValue(50);
  });

  it("should trigger onComplete fn when click arrow up/down", async () => {
    const input = await getInput();
    input.focus();
    await userEvent.keyboard("[arrowup]");
    // somehow doesn't update the value, look like a unresolved bug
    // https://github.com/testing-library/user-event/issues/1066
    expect(onCompleteSpy).toHaveBeenCalled();
  });
});
