import { RefObject, useCallback, useEffect } from "react";

export const useSyncScroll = (
  refs: RefObject<HTMLElement>[],
  dir: "X" | "Y" = "X",
) => {
  useEffect(() => {
    refs.forEach((ref) =>
      ref.current?.addEventListener("scroll", scrollListener),
    );

    return () => {
      refs.forEach((ref) =>
        ref.current?.removeEventListener("scroll", scrollListener),
      );
    };
  }, []);

  const scrollListener = useCallback((e: Event) => {
    const currElm = e.target as HTMLElement;
    const targetRefs = refs.filter((ref) => ref.current !== currElm);
    targetRefs.forEach((ref) => {
      if (dir === "X")
        ref.current?.scroll(currElm.scrollLeft, ref.current.scrollTop);
      if (dir === "Y")
        ref.current?.scroll(ref.current.scrollLeft, currElm.scrollTop);
    });
  }, []);
};
