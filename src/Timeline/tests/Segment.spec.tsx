import { render, screen } from "@testing-library/react";

import { Segment } from "../Segment";

describe("Segment", () => {
  it("should render", async () => {
    render(<Segment />);
    expect(await screen.findByTestId("segment")).toBeInTheDocument();
  });
});
