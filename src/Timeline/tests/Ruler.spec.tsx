import {
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";

import { Ruler } from "../Ruler";
import { TIMELINE_MAX_DURATION } from "../../constants";
import { act } from "react-dom/test-utils";
import { createRef } from "react";
import { useTimelineStore } from "../Timeline.store";

const getRuler = (): Promise<HTMLDivElement> => screen.findByTestId("ruler");
const createHook = () => renderHook(() => useTimelineStore());
describe("Ruler", () => {
  beforeEach(() => {
    const ref = createRef<HTMLDivElement>();
    render(<Ruler ref={ref} />);
  });

  afterEach(() => cleanup());

  it("should render", async () => {
    const ruler = await getRuler();
    expect(ruler).toBeInTheDocument();
  });

  it("should expend/shrink according when the duration change", async () => {
    const { result } = createHook();
    const ruler = await getRuler();
    const child = ruler.firstChild as HTMLDivElement;
    expect(child.style.width).toBe(`${TIMELINE_MAX_DURATION}px`);
    act(() => result.current.setDuration(3000));
    expect(child.style.width).toBe(`${3000}px`);
  });

  it("should update time when its value changes", async () => {
    const { result } = createHook();
    const ruler = await getRuler();
    const input = ruler.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: 50 } });
    expect(result.current.time).toBe(50);
  });

  it("should update the offset when scroll", async () => {
    const { result } = createHook();
    const ruler = await getRuler();
    expect(result.current.offset).toBe(0);
    ruler.scrollLeft = 100;
    fireEvent.scroll(ruler);
    expect(result.current.offset).toBe(100);
  });
});
