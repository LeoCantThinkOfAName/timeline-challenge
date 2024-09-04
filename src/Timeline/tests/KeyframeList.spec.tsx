import { render, screen } from "@testing-library/react";

import { DEFAULT_TRACKS } from "../../constants";
import { KeyframeList } from "../KeyframeList";

describe("KeyframList", () => {
  it("should render", async () => {
    render(<KeyframeList />);
    expect(await screen.findAllByTestId("segment")).toHaveLength(
      DEFAULT_TRACKS.length,
    );
  });
});
