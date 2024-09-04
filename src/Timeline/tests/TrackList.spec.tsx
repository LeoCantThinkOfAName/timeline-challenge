import { render, screen } from "@testing-library/react";

import { DEFAULT_TRACKS } from "../../constants";
import { TrackList } from "../TrackList";

describe("TrackList", () => {
  it("should render", async () => {
    render(<TrackList />);
    expect(await screen.findByTestId("track-list")).toBeInTheDocument();
    expect((await screen.findByTestId("track-list")).childNodes.length).toBe(
      DEFAULT_TRACKS.length,
    );
  });
});
