import { Browser, Locator, Page, expect, test } from "@playwright/test";

let page: Page;
let timeLocator: Locator;
let durationLocator: Locator;
let playheadLocator: Locator;
let rulerLocator: Locator;
let keyframeLocator: Locator;
let trackListLocator: Locator;
let segmentLocator: Locator;

const initialize = async (browser: Browser) => {
  page = await browser.newPage();
  timeLocator = page.locator("input[data-testid=time]");
  durationLocator = page.locator("input[data-testid=max-time]");
  playheadLocator = page.locator("div[data-testid=playhead]");
  rulerLocator = page.locator("div[data-testid=ruler]");
  keyframeLocator = page.locator("div[data-testid=keyframe-list]");
  trackListLocator = page.locator("div[data-testid=track-list]");
  rulerLocator = page.locator("div[data-testid=ruler]");
  segmentLocator = page.locator("div[data-testid=segment]").first();
  await page.goto("/");
};

test.describe.serial("Timeline (Number input field)", () => {
  test.beforeAll(async ({ browser }) => initialize(browser));

  test("The displayed value updates immediately while typing, but onChange is not triggered until input is confirmed", async () => {
    await timeLocator.fill("100");
    await expect(timeLocator).toHaveValue("100");
  });

  test("Clicking outside the input field removes focus and changes the value", async () => {
    const title = page.getByText("Phase Timeline Challenge");
    timeLocator.focus();
    await expect(timeLocator).toBeFocused();
    title.click();
    await expect(timeLocator).not.toBeFocused();
  });

  test("Pressing up arrow or down arrow keys immediately changes the value", async () => {
    await timeLocator.press("ArrowUp");
    await expect(timeLocator).toHaveValue("110");
  });

  test("Entire text is selected when the input field gains focus", async () => {
    timeLocator.focus();
    const val = await page.evaluate(() => document.getSelection()?.toString());
    expect(val).toBe("110");
  });

  test("Entire text is selected after using the up arrow or down arrow keys", async () => {
    await timeLocator.press("ArrowUp");
    const val = await page.evaluate(() => document.getSelection()?.toString());
    expect(val).toBe("120");
  });

  test("Pressing Enter confirms the new value and removes focus", async () => {
    await timeLocator.fill("200");
    await timeLocator.press("Enter");
    await expect(timeLocator).not.toBeFocused();
    await expect(timeLocator).toHaveValue("200");
  });

  test("Pressing Escape reverts to the original value and removes focus", async () => {
    await timeLocator.fill("300");
    await timeLocator.press("Escape");
    await expect(timeLocator).toHaveValue("200");
  });

  test("Leading zeros are automatically removed", async () => {
    await timeLocator.fill("0100");
    await timeLocator.press("Enter");
    await expect(timeLocator).toHaveValue("100");
  });

  test("Negative values are automatically adjusted to the minimum allowed value", async () => {
    await timeLocator.fill("-10");
    await timeLocator.press("Enter");
    await expect(timeLocator).toHaveValue("0");
  });

  test("Decimal values are automatically rounded to the nearest integer", async () => {
    await timeLocator.fill("100.5");
    await timeLocator.press("Enter");
    await expect(timeLocator).toHaveValue("100");
  });
});

test.describe.serial("Timeline (Play Controls Behavior)", () => {
  const max = "500";
  const newMax = "300";
  test.beforeAll(async ({ browser }) => initialize(browser));

  test("Current Time is always between 0ms and the Duration", async () => {
    await durationLocator.fill(max);
    await durationLocator.press("Enter");
    await timeLocator.fill("600");
    await timeLocator.press("Enter");
    await expect(timeLocator).toHaveValue(max);
    await timeLocator.fill("-10");
    await timeLocator.press("Enter");
    await expect(timeLocator).toHaveValue("0");
  });

  test("Current Time adjusts if it exceeds the newly set Duration", async () => {
    await timeLocator.fill(max);
    await timeLocator.press("Enter");
    await durationLocator.fill(newMax);
    await durationLocator.press("Enter");
    await expect(timeLocator).toHaveValue(newMax);
  });

  test("Duration is always between 100ms and 6000ms", async () => {
    await durationLocator.fill("7000");
    await durationLocator.press("Enter");
    await expect(durationLocator).toHaveValue("6000");
    await durationLocator.fill("50");
    await durationLocator.press("Enter");
    await expect(durationLocator).toHaveValue("100");
  });

  test("Current Time and Duration are always multiples of 10ms", async () => {
    await timeLocator.fill("101");
    await timeLocator.press("Enter");
    await expect(timeLocator).toHaveValue("100");
  });

  test("Current Time and Duration are always positive integers", async () => {
    await timeLocator.fill("-10");
    await timeLocator.press("Enter");
    await expect(timeLocator).toHaveValue("0");
    await durationLocator.fill("-10");
    await durationLocator.press("Enter");
    await expect(durationLocator).toHaveValue("100");
  });

  test("Playhead position updates only after specific actions on Current Time input (losing focus, pressing Enter, using arrow keys, or clicking up/down buttons)", async () => {
    const compareStyle = async (fn: () => Promise<unknown>) => {
      let style = await playheadLocator.getAttribute("style");
      await fn();
      let newStyle = await playheadLocator.getAttribute("style");
      return style !== newStyle;
    };
    // enter
    expect(
      await compareStyle(async () => {
        await timeLocator.fill("50");
        await timeLocator.press("Enter");
      }),
    ).toBe(true);
    // blur
    expect(
      await compareStyle(async () => {
        await timeLocator.fill("60");
        await timeLocator.blur();
      }),
    ).toBe(true);
    // arrow up
    expect(
      await compareStyle(async () => {
        await timeLocator.focus();
        await timeLocator.press("ArrowUp");
        await timeLocator.blur();
      }),
    ).toBe(true);
  });
});

test.describe.serial("Timeline (Ruler Behavior)", () => {
  test.beforeAll(async ({ browser }) => initialize(browser));

  test("Clicking or dragging on the Ruler updates the Current Time and Playhead position", async () => {
    let currVal: string = "0";
    // click
    await expect(timeLocator).toHaveValue(currVal);
    await rulerLocator.click({
      position: {
        x: 100,
        y: 10,
      },
    });
    await expect(timeLocator).not.toHaveValue("0");
    currVal = (await timeLocator.getAttribute("value")) as string;
    // drag
    await rulerLocator.dragTo(rulerLocator, {
      targetPosition: {
        x: 200,
        y: 10,
      },
    });
    await expect(timeLocator).not.toHaveValue(currVal);
  });

  test("Horizontal scrolling of the Ruler is synchronized with the Keyframe List", async () => {
    await rulerLocator.evaluate((e) => (e.scrollLeft += 10));
    const scrollLeft = await keyframeLocator.evaluate((e) => e.scrollLeft);
    expect(scrollLeft).toBe(10);
  });

  test("Ruler length visually represents the total Duration (1ms = 1px)", async () => {
    const rulerW = await rulerLocator.evaluate(
      (e) => (e.firstChild as HTMLDivElement).offsetWidth,
    );
    expect(rulerW).toBe(6000);
  });

  test("Ruler length updates only after specific actions on Duration input (losing focus, pressing Enter, using arrow keys, or clicking up/down buttons)", async () => {
    durationLocator.fill("500");
    durationLocator.press("Enter");
    const newRulerW = await rulerLocator.evaluate(
      (e) => (e.firstChild as HTMLDivElement).offsetWidth,
    );
    expect(newRulerW).toBe(500);
  });
});

test.describe.serial("Timeline (Track List Behavior)", () => {
  test.beforeAll(async ({ browser }) => initialize(browser));

  test("Vertical scrolling of the Track List is synchronized with the Keyframe List", async () => {
    await trackListLocator.evaluate((e) => (e.scrollTop += 10));
    const scrollTop = await keyframeLocator.evaluate((e) => e.scrollTop);
    expect(scrollTop).toBe(10);
  });
});

test.describe.serial("Timeline (Keyframe List Behavior)", () => {
  test.beforeAll(async ({ browser }) => initialize(browser));

  test("Vertical scrolling is synchronized with the Track List", async () => {
    await keyframeLocator.evaluate((e) => (e.scrollTop += 10));
    const scrollTop = await trackListLocator.evaluate((e) => e.scrollTop);
    expect(scrollTop).toBe(10);
  });

  test("Horizontal scrolling is synchronized with the Ruler", async () => {
    await keyframeLocator.evaluate((e) => (e.scrollLeft += 10));
    const scrollLeft = await rulerLocator.evaluate((e) => e.scrollLeft);
    expect(scrollLeft).toBe(10);
  });

  test("Segment length visually represents the total Duration (1ms = 1px)", async () => {
    const segmentW = await segmentLocator.evaluate(
      (e) => (e.firstChild as HTMLDivElement).offsetWidth,
    );
    expect(segmentW).toBe(6000);
  });

  test("Segment length updates only after specific actions on Duration input (losing focus, pressing Enter, using arrow keys, or clicking up/down buttons)", async () => {
    const compareWidth = async (width: number) => {
      let segmentW = await segmentLocator.evaluate(
        (e) => (e as HTMLDivElement).offsetWidth,
      );
      return width === segmentW;
    };
    // enter
    await durationLocator.fill("100");
    await durationLocator.press("Enter");
    expect(await compareWidth(100)).toBe(true);
    // blur
    await durationLocator.fill("200");
    await durationLocator.blur();
    expect(await compareWidth(200)).toBe(true);
    // arrow up
    await durationLocator.focus();
    await durationLocator.press("ArrowUp");
    await durationLocator.blur();
    expect(await compareWidth(210)).toBe(true);
  });
});

test.describe.serial("Timeline (Playhead Behavior)", () => {
  let playheadPos: number = 0;
  test.beforeAll(async ({ browser }) => initialize(browser));

  test("Playhead is visible only when within the Timeline's visible area, using the hidden attribute when completely out of view", async () => {
    await rulerLocator.click({
      position: {
        x: 200,
        y: 10,
      },
    });
    playheadPos = await playheadLocator.evaluate(
      (e) => e.getBoundingClientRect().left,
    );
    await rulerLocator.evaluate((e) => (e.scrollLeft += 1000));
    const isHidden = await playheadLocator.evaluate((e) =>
      e.hasAttribute("hidden"),
    );
    expect(isHidden).toBe(true);
  });

  test("Playhead moves in sync with the Ruler and Keyframe List during horizontal scrolling", async () => {
    await rulerLocator.evaluate((e) => (e.scrollLeft -= 990));
    const newPos = await playheadLocator.evaluate(
      (e) => (e as HTMLDivElement).getBoundingClientRect().left,
    );
    expect(newPos).toBe(playheadPos - 10);
  });

  test("Playhead maintains its relative position during horizontal scrolling", async () => {
    await rulerLocator.evaluate((e) => (e.scrollLeft -= 10));
    const currTime = await timeLocator.getAttribute("value");
    const trackListW = await trackListLocator.evaluate(
      (e) => (e as HTMLDivElement).offsetWidth,
    );
    const diff =
      (await rulerLocator.evaluate((e) => e.scrollWidth)) -
      (await rulerLocator.evaluate(
        (e) => (e.firstChild as HTMLDivElement).getBoundingClientRect().width,
      ));
    console.log(diff, trackListW);
    expect(trackListW + Number(currTime) + diff / 2 - 1).toBe(playheadPos);
  });
});
