import { TIMELINE_MAX_DURATION } from "../../constants";
import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react";
import { useTimelineStore } from "../Timeline.store";

describe("useTimelinStore", () => {
  it("should be initializaed with correct value", () => {
    const { result } = renderHook(() => useTimelineStore());
    expect(result.current.duration).toBe(TIMELINE_MAX_DURATION);
  });

  it("should update values", async () => {
    const { result } = renderHook(() => useTimelineStore());
    act(() => result.current.setDuration(10));
    expect(result.current.duration).toBe(10);
    act(() => result.current.setTime(10));
    expect(result.current.time).toBe(10);
    act(() => result.current.setOffset(10));
    expect(result.current.offset).toBe(10);
  });
});
