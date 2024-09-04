import { getRoundedTime } from "./index";

describe("getRoundedTime util function", () => {
  test("should return correct number", () => {
    expect(getRoundedTime(11)).toBe(10);
    expect(getRoundedTime(16)).toBe(20);
    expect(getRoundedTime(11.5)).toBe(10);
    expect(getRoundedTime(15.5)).toBe(20);
  });
});
