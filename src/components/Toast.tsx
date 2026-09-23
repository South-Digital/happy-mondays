import { AnimatePresence, motion } from 'framer-motion'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../lib/motion'

type ToastContextValue = { show: (message?: string) => void }

const ToastContext = createContext<ToastContextValue>({ show: () => {} })

/** §7 — every link/CTA is mocked; tapping one raises this toast instead of navigating. */
export const PROTOTYPE_TOAST = 'Prototype — links disabled'

export function ToastProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const show = useCallback((next: string = PROTOTYPE_TOAST) => {
    window.clearTimeout(timer.current)
    setMessage(next)
    timer.current = window.setTimeout(() => setMessage(null), 6000)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const value = useMemo(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex justify-center px-5"
      >
        <AnimatePresence>
          {message && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : 8 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
              className="max-w-[470px] rounded-2xl bg-ink/95 px-4 py-2.5 text-[13px] font-medium text-white shadow-chip backdrop-blur"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}

/**
 * A mocked link: renders as an anchor for semantics and keyboard access but
 * never navigates (§7).
 */
export function MockLink({
  children,
  className,
  label,
}: {
  children: ReactNode
  className?: string
  label?: string
}) {
  const { show } = useToast()
  return (
    <a
      href="#"
      className={className}
      aria-label={label}
      onClick={(e) => {
        e.preventDefault()
        show()
      }}
    >
      {children}
    </a>
  )
}
