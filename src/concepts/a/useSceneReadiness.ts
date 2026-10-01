import { useLayoutEffect, useState, type RefObject } from "react";
import { useInView } from "framer-motion";
import { sceneRevealAmount } from "./sceneReadiness";

/** Measure only until the first reveal. No scroll listener or per-frame layout. */
export function useSceneReadiness(ref: RefObject<HTMLElement>) {
  const [amount, setAmount] = useState(0.42);
  const ready = useInView(ref, { amount, once: true });
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || ready) return;
    const measure = () => setAmount(sceneRevealAmount(element.getBoundingClientRect(), {
      width: document.documentElement.clientWidth,
      height: window.innerHeight,
    }));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref, ready]);
  return ready;
}
