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
    // On a fresh SPA load the browser can resolve the fragment before React
    // mounts its target. Wait for layout, then honour it without a long scroll
    // through every scene. Leave an already-restored history position alone.
    const anchorFrame = requestAnimationFrame(() => {
      if (!window.location.hash || window.scrollY !== 0) return;
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); }
      catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      if (lenis) {
        // The pinned journey measures its travel during mount. Refresh the
        // scroll limit before seeking below it rather than clamping too early.
        lenis.resize();
        lenis.scrollTo(target, { immediate: true });
      }
      else target.scrollIntoView({ behavior: "instant", block: "start" });
      target.focus({ preventScroll: true });
    });
    preference.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(anchorFrame);
      preference.removeEventListener("change", configure);
      lenis?.destroy();
    };
  }, [pathname, search]);

  return null;
}
