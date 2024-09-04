import { cleanup, render, screen } from "@testing-library/react";

import { PlayControls } from "../PlayControls";

const getElms = async (): Promise<{
  playhead: HTMLDivElement;
  time: HTMLInputElement;
  duration: HTMLInputElement;
}> => {
  const playhead = await screen.findByTestId<HTMLDivElement>("play-controls");
  const time = await screen.findByTestId<HTMLInputElement>("time");
  const duration = await screen.findByTestId<HTMLInputElement>("max-time");
  return { playhead, time, duration };
};
describe("PlayControls", () => {
  beforeEach(() => render(<PlayControls />));
  afterEach(() => cleanup());
  it("should render", async () => {
    const { playhead, time, duration } = await getElms();
    expect(playhead).toBeInTheDocument();
    expect(time).toBeInTheDocument();
    expect(duration).toBeInTheDocument();
  });
});
