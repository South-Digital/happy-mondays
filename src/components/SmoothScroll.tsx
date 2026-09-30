import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Smooth wheel input on the window; touch and reduced motion remain native. */
export function SmoothScroll() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedPreview = new URLSearchParams(search).get("motion") === "reduce";
    let lenis: Lenis | undefined;

    const configure = () => {
      lenis?.destroy();
      lenis = undefined;
      if (reducedPreview || preference.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.12,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        stopInertiaOnNavigate: true,
      });
    };

    configure();
    preference.addEventListener("change", configure);
    return () => {
      preference.removeEventListener("change", configure);
      lenis?.destroy();
    };
  }, [pathname, search]);

  return null;
}
