import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { useToast } from "../../components/Toast";

export type NavigationLink = { label: string; href: string };

function MenuPanel({ links, reduced, close }: {
  links: NavigationLink[]; reduced: boolean; close: () => void;
}) {
  const present = useIsPresent();
  const { show } = useToast();
  return <motion.nav id="ha-mobile-navigation" aria-label="Mobile navigation"
    aria-hidden={!present} data-lenis-prevent
    initial={reduced ? false : { opacity: 0, y: -6, scale: .985 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -4, scale: .99 }}
    transition={{ duration: reduced ? 0 : present ? .24 : .16, ease: [.22, 1, .36, 1] }}
    style={{ transformOrigin: "top right", pointerEvents: present ? "auto" : "none" }}>
    {[...links, { label: "Book a call", href: "/book-a-call" }].map(link =>
      <a key={link.label} href={link.href} tabIndex={present ? 0 : -1}
        onClick={event => {
          close();
          if (link.href.startsWith("#")) return;
          event.preventDefault();
          show(link.label === "Book a call"
            ? "Design preview — the booking calendar will be connected before launch."
            : "Design preview — this page is not connected yet.");
        }}>{link.label}</a>)}
  </motion.nav>;
}

/** A disclosure with a reversible exit; never traps focus or leaves fading links active. */
export function MobileNavigation({ links, reduced }: { links: NavigationLink[]; reduced: boolean }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (!desktop.matches) return;
      if (root.current?.contains(document.activeElement)) {
        root.current.closest("header")?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
      }
      setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);
  return <div className="ha-mobile-menu" ref={root} data-open={open}
    onBlur={event => {
      if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}
    onKeyDown={event => {
      if (event.key !== "Escape" || !open) return;
      event.preventDefault();
      setOpen(false);
      toggle.current?.focus();
    }}>
    <button className="ha-menu-toggle" type="button" ref={toggle}
      aria-expanded={open} aria-controls="ha-mobile-navigation" onClick={() => setOpen(value => !value)}>
      Menu <span aria-hidden="true">+</span>
    </button>
    <AnimatePresence initial={false}>
      {open && <MenuPanel links={links} reduced={reduced} close={() => {
        setOpen(false);
        toggle.current?.focus({ preventScroll: true });
      }} />}
    </AnimatePresence>
  </div>;
}
