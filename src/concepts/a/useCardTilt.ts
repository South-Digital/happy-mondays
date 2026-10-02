import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import { useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

/** Bound the edge movement, not just the angle: a full-width card should feel
 * as quiet as a narrow one. Measure its untransformed layout to avoid feedback. */
export function useCardTilt(reduced: boolean, visibility?: MotionValue<number>) {
  const ref = useRef<HTMLElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const frame = useRef<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lift = useMotionValue(0);
  const spring = { stiffness: 190, damping: 27, mass: 0.6 };
  const rotateX = useSpring(x, spring);
  const rotateY = useSpring(y, spring);
  const translateY = useSpring(lift, spring);
  const boxShadow = useTransform(translateY, [0, -2], [
    "inset 0 1px 0 #ffffffad, 0 24px 46px -40px #34453866",
    "inset 0 1px 0 #ffffffc7, 0 28px 48px -34px #34453866",
  ]);
  const reset = useCallback(() => {
    pointer.current = null;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    x.set(0); y.set(0); lift.set(0);
  }, [x, y, lift]);

  const measure = useCallback(() => {
    frame.current = null;
    const card = ref.current;
    const point = pointer.current;
    if (!card || !point) return;
    if (reduced || document.hidden || (visibility && visibility.get() < 0.08)) { reset(); return; }
    const parent = card.offsetParent?.getBoundingClientRect();
    if (!parent) return;
    const width = card.offsetWidth;
    const height = card.offsetHeight;
    const px = (point.x - parent.left - card.offsetLeft) / width;
    const py = (point.y - parent.top - card.offsetTop) / height;
    if (px < 0 || px > 1 || py < 0 || py > 1) { reset(); return; }
    const strength = visibility ? visibility.get() : 1;
    const angle = (size: number) => Math.min(1.4, Math.atan(7 / Math.max(1, size)) * 180 / Math.PI);
    x.set((0.5 - py) * 2 * angle(height) * strength);
    y.set((px - 0.5) * 2 * angle(width) * strength);
    lift.set(-2 * strength);
  }, [reduced, visibility, reset, x, y, lift]);

  // Coalesce input and layout changes into one read. A still card needs no loop;
  // ResizeObserver keeps a stationary pointer correct while the card expands.
  const schedule = useCallback(() => {
    if (pointer.current && frame.current === null) frame.current = requestAnimationFrame(measure);
  }, [measure]);

  useEffect(() => {
    if (reduced) reset();
    const clearWhenHidden = () => { if (document.hidden) reset(); };
    const observer = new ResizeObserver(schedule);
    if (ref.current) observer.observe(ref.current);
    const unsubscribe = visibility?.on("change", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", clearWhenHidden);
    return () => {
      observer.disconnect();
      unsubscribe?.();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", clearWhenHidden);
      reset();
    };
  }, [reduced, visibility, reset, schedule]);

  const track = (event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    pointer.current = { x: event.clientX, y: event.clientY };
    schedule();
  };
  return {
    ref,
    onPointerEnter: track,
    onPointerMove: track,
    onPointerLeave: reset,
    onPointerCancel: reset,
    style: { rotateX, rotateY, y: translateY, transformPerspective: 1200, boxShadow },
  };
}
