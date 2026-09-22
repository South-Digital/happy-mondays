import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Wordmark } from './Brand'
import { MockLink, useToast } from './Toast'
import { usePrefersReducedMotion } from '../lib/motion'

const LINKS = ['Reviews', 'Case Studies', 'Pricing', 'Blog', 'Contact']

/**
 * §5 — mobile nav: logo + a "Menu" pill that opens a full-screen sheet holding
 * the links and the "Book a call" pill. Closes on link tap and on Esc.
 * Every target is at least 44px.
 */
export function MobileNav({ variant }: { variant: 'a' | 'b' }) {
  const [open, setOpen] = useState(false)
  const reduced = usePrefersReducedMotion()
  const { show } = useToast()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    // Stop the page behind the sheet from scrolling
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const triggerClass =
    variant === 'a'
      ? 'btn-liquid min-h-[44px] px-5 text-[14px]'
      : 'btn-solid min-h-[44px] px-5 text-[14px]'

  return (
    <div className="md:hidden">
      <div
        className={
          variant === 'b'
            ? 'flex items-center justify-between rounded-[20px] bg-white px-4 py-2.5 shadow-[0_8px_24px_rgba(28,33,48,.08)]'
            : 'flex items-center justify-between'
        }
      >
        <MockLink label="Happy Mondays — home">
          <Wordmark />
        </MockLink>
        <button
          type="button"
          className={triggerClass}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[90] flex flex-col bg-offwhite px-5 pb-10 pt-7"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <div className="flex items-center justify-between">
              <Wordmark />
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-pill border border-line bg-white text-ink"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <path
                    d="m4 4 8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="mt-10 flex flex-1 flex-col">
              <ul className="flex flex-col">
                {LINKS.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="flex min-h-[56px] items-center text-[26px] font-medium tracking-[-0.02em] text-ink"
                      onClick={(e) => {
                        e.preventDefault()
                        setOpen(false)
                        show()
                      }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <a
                  href="#"
                  className={`${
                    variant === 'a' ? 'btn-liquid' : 'btn-solid'
                  } min-h-[52px] w-full justify-center`}
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(false)
                    show()
                  }}
                >
                  Book a call
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
