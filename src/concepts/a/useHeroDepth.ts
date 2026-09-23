import { useLayoutEffect, type RefObject } from "react";
import {
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/** Native scroll drives compositor transforms; layout is measured only on resize. */
export function useHeroDepth(scene: RefObject<HTMLDivElement>) {
  const { scrollY } = useScroll();
  const start = useMotionValue(0);
  const distance = useMotionValue(480);
  const strength = useMotionValue(1);
  const orderTravel = useMotionValue(-44);
  const target = useTransform(() =>
    Math.max(0, Math.min(1, (scrollY.get() - start.get()) / distance.get())),
  );
  // Damped: soften wheel steps without overshoot or changing page scroll.
  const progress = useSpring(target, {
    stiffness: 180,
    damping: 32,
    mass: 0.45,
  });

  useLayoutEffect(() => {
    const element = scene.current;
    if (!element) return;
    const measure = () => {
      start.set(element.getBoundingClientRect().top + window.scrollY);
      // The current study is only one scene. Still give short desktop pages a
      // complete, restrained depth sequence without adding artificial scroll space.
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      distance.set(Math.max(160, Math.min(480, available)));
      // The card shares the chart's horizontal space at medium widths;
      // keep it anchored so its surface cannot cover the chart heading.
      orderTravel.set(
        window.innerWidth <= 700 ? -8 : window.innerWidth <= 1200 ? 0 : -44,
      );
      strength.set(
        window.innerWidth <= 700 ? 0.45 : window.innerWidth <= 1100 ? 0.7 : 1,
      );
    };
    measure();
    progress.jump(target.get());
    const observer = new ResizeObserver(measure);
    observer.observe(element.parentElement ?? element);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [scene, start, distance, strength, orderTravel, progress, target]);

  const depth = useTransform(() => progress.get() * strength.get());
  return {
    seaY: useTransform(depth, [0, 1], [0, 28]),
    foregroundY: useTransform(depth, [0, 1], [0, -10]),
    dashboardY: useTransform(depth, [0, 1], [0, -10]),
    dashboardScale: useTransform(depth, [0, 1], [1, 1.01]),
    orderY: useTransform(() => progress.get() * orderTravel.get()),
    orderScale: useTransform(depth, [0, 1], [1, 1.018]),
  };
}
