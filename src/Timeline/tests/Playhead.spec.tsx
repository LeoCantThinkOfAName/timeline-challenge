import { render, renderHook, screen } from "@testing-library/react";

import { Playhead } from "../Playhead";
import { act } from "react-dom/test-utils";
import { useTimelineStore } from "../Timeline.store";

describe("Playhead", () => {
  beforeEach(() => {
    render(<Playhead />);
  });
  it("should render", async () => {
    expect(await screen.findByTestId("playhead")).toBeInTheDocument();
  });

  it("should move to relative position when time changes", async () => {
    const { result } = renderHook(() => useTimelineStore());
    // translateX(calc(${time - offset}px - 50%))
    const playhead = await screen.findByTestId("playhead");
    act(() => result.current.setOffset(10));
    act(() => result.current.setTime(100));
    expect(playhead.style.transform).toBe("translateX(calc(90px - 50%))");
  });

  it("should hide when not in view", async () => {
    const { result } = renderHook(() => useTimelineStore());
    const playhead = await screen.findByTestId("playhead");
    expect(playhead.hidden).toBe(false);
    act(() => result.current.setTime(10));
    act(() => result.current.setOffset(100));
    expect(playhead.hidden).toBe(true);
  });
});
