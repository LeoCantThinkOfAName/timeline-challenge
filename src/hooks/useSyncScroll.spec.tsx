import {
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";

import { createRef } from "react";
import { useSyncScroll } from "./useSyncScroll";

const refA = createRef<HTMLDivElement>();
const refB = createRef<HTMLDivElement>();
const spyA = jest.fn();
const spyB = jest.fn();
const getElms = async () => {
  const A = await screen.findByTestId("a");
  const B = await screen.findByTestId("b");
  return [A, B];
};
const createHook = (dir: "X" | "Y") =>
  renderHook(() => useSyncScroll([refA, refB], dir));
describe("useSyncScroll", () => {
  beforeEach(() => {
    render(
      <div>
        <div ref={refA} data-testid="a" />
        <div ref={refB} data-testid="b" />
      </div>,
    );
    refA.current!.scroll = spyA;
    refB.current!.scroll = spyB;
  });
  afterAll(() => cleanup());

  it("should render", async () => {
    const { result } = createHook("X");
    expect(result).toBeDefined();
  });

  it("should call scroll on refB when refA being scrolled", async () => {
    const [A, B] = await getElms();
    createHook("X");
    fireEvent.scroll(A);
    expect(spyB).toHaveBeenCalled();
    fireEvent.scroll(B);
    expect(spyA).toHaveBeenCalled();
  });

  it("should", async () => {
    const [A, B] = await getElms();
    createHook("Y");
    fireEvent.scroll(A);
    expect(spyB).toHaveBeenCalled();
    fireEvent.scroll(B);
    expect(spyA).toHaveBeenCalled();
  });
});
