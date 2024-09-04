import { render, screen } from "@testing-library/react";

import { Timeline } from "../Timeline";

describe("Timeline", () => {
  it("should render", async () => {
    render(<Timeline />);
    expect(await screen.findByTestId("timeline")).toBeInTheDocument();
  });
});
