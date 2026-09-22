import type { SVGProps } from 'react'

type I = SVGProps<SVGSVGElement>

const base = (p: I) => ({
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  'aria-hidden': true,
  ...p,
})

const stroke = {
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/* ---- Shopify admin sidebar ---- */

export const ShopBag = (p: I) => (
  <svg {...base(p)}>
    <path d="M3.4 5.2h9.2l.7 8.1a1 1 0 0 1-1 1.1H3.7a1 1 0 0 1-1-1.1l.7-8.1Z" {...stroke} />
    <path d="M6 6.6V4.4a2 2 0 1 1 4 0v2.2" {...stroke} />
  </svg>
)

export const HomeIcon = (p: I) => (
  <svg {...base(p)}>
    <path d="M2.8 6.8 8 2.6l5.2 4.2v6a.9.9 0 0 1-.9.9H3.7a.9.9 0 0 1-.9-.9v-6Z" {...stroke} />
    <path d="M6.3 13.7V9.2h3.4v4.5" {...stroke} />
  </svg>
)

export const OrdersIcon = (p: I) => (
  <svg {...base(p)}>
    <rect x="2.8" y="3.2" width="10.4" height="9.6" rx="1.4" {...stroke} />
    <path d="M5.6 6.4h4.8M5.6 9.2h3.2" {...stroke} />
  </svg>
)

export const ProductsIcon = (p: I) => (
  <svg {...base(p)}>
    <path d="M8 2.4 13.4 5v6L8 13.6 2.6 11V5L8 2.4Z" {...stroke} />
    <path d="M2.6 5 8 7.6 13.4 5M8 7.6v6" {...stroke} />
  </svg>
)

export const CustomersIcon = (p: I) => (
  <svg {...base(p)}>
    <circle cx="8" cy="6" r="2.4" {...stroke} />
    <path d="M3.4 13.2a4.6 4.6 0 0 1 9.2 0" {...stroke} />
  </svg>
)

export const MarketingIcon = (p: I) => (
  <svg {...base(p)}>
    <path d="M3 6.4h2.6L11 3.4v9.2L5.6 9.6H3a.8.8 0 0 1-.8-.8V7.2a.8.8 0 0 1 .8-.8Z" {...stroke} />
    <path d="M12.8 6.6a2.4 2.4 0 0 1 0 2.8" {...stroke} />
  </svg>
)

export const AnalyticsIcon = (p: I) => (
  <svg {...base(p)}>
    <path d="M3.2 12.8V9M6.4 12.8V5.6M9.6 12.8v-4.4M12.8 12.8V3.6" {...stroke} />
  </svg>
)

export const DiscountsIcon = (p: I) => (
  <svg {...base(p)}>
    <path d="M8.5 2.6H13v4.5l-6 6-4.5-4.5 6-6Z" {...stroke} />
    <circle cx="10.6" cy="5.2" r="0.9" fill="currentColor" />
  </svg>
)

/* ---- General ---- */

export const ChevronDown = (p: I) => (
  <svg {...base(p)}>
    <path d="M4.5 6.5 8 10l3.5-3.5" {...stroke} />
  </svg>
)

export const SearchIcon = (p: I) => (
  <svg {...base(p)}>
    <circle cx="7.3" cy="7.3" r="4.1" {...stroke} />
    <path d="m10.4 10.4 2.6 2.6" {...stroke} />
  </svg>
)

export const ArrowUpRight = (p: I) => (
  <svg {...base(p)}>
    <path d="M5.2 10.8 10.8 5.2M6.4 5.2h4.4v4.4" {...stroke} />
  </svg>
)

export const TrendUp = (p: I) => (
  <svg {...base({ width: 10, height: 10, viewBox: '0 0 10 10', ...p })}>
    <path d="M2 7 5 4l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Check = (p: I) => (
  <svg {...base(p)}>
    <path d="m3.6 8.4 2.7 2.7 6.1-6.2" {...stroke} strokeWidth={1.7} />
  </svg>
)

export const Cross = (p: I) => (
  <svg {...base(p)}>
    <path d="m4.4 4.4 7.2 7.2M11.6 4.4 4.4 11.6" {...stroke} strokeWidth={1.7} />
  </svg>
)

export const Play = (p: I) => (
  <svg {...base({ viewBox: '0 0 24 24', width: 24, height: 24, ...p })}>
    <path d="M9 6.5v11l9-5.5-9-5.5Z" fill="currentColor" />
  </svg>
)

export const Star = (p: I) => (
  <svg {...base({ viewBox: '0 0 12 12', width: 12, height: 12, ...p })}>
    <path
      d="M6 1.2 7.45 4.3l3.35.42-2.46 2.3.64 3.32L6 8.72 2.98 10.34l.64-3.32-2.46-2.3L4.51 4.3 6 1.2Z"
      fill="currentColor"
    />
  </svg>
)

/* ---- Partner marks (proof row) ---- */

export const ShopifyMark = (p: I) => (
  <svg {...base({ viewBox: '0 0 20 20', width: 20, height: 20, ...p })}>
    <path
      d="M13.9 4.2c-.1 0-.9.2-.9.2s-.6-.6-.7-.7c-.1-.1-.3-.1-.4-.1l-.5 11.9 4.4-.9s-1.8-11.7-1.8-11.8c-.1-.5-.1-.6-.1-.6Zm-2.6.5-.8.2c0-.5-.1-1.1-.3-1.5.6.1.9.8 1.1 1.3Zm-1.4.4-1.7.5c.2-.7.5-1.3.9-1.7.2-.2.4-.3.6-.4.2.4.2 1 .2 1.6Zm-.9-2.4c.2 0 .3 0 .5.1-.2.1-.5.4-.7.6-.4.5-.8 1.2-.9 2.2l-1.4.4C6.8 4.7 7.7 2.8 9 2.7Z"
      fill="currentColor"
    />
    <path d="M13.5 3.6c-.1 0-.1 0 0 0l-.7.2s-.4-.4-.6-.6l1.3.4Z" fill="currentColor" opacity=".7" />
    <path
      d="M6.1 6.3 5.5 8s-.7-.3-1.4-.3c-1.1 0-1.2.7-1.2.9 0 1 2.6 1.4 2.6 3.7 0 1.8-1.2 3-2.7 3-1.9 0-2.8-1.2-2.8-1.2l.5-1.7s1 .9 1.8.9c.5 0 .8-.4.8-.8 0-1.3-2.2-1.4-2.2-3.5 0-1.8 1.3-3.5 3.9-3.5.9 0 1.3.2 1.3.2Z"
      fill="currentColor"
      transform="translate(4.2 1.4) scale(.78)"
    />
  </svg>
)

export const GoogleAdsMark = (p: I) => (
  <svg {...base({ viewBox: '0 0 20 20', width: 20, height: 20, ...p })}>
    <path d="M7.1 2.9 12.9 13a2.1 2.1 0 0 1-3.6 2.1L3.5 5a2.1 2.1 0 0 1 3.6-2.1Z" fill="currentColor" opacity=".55" />
    <path d="M12.9 2.9 7.1 13a2.1 2.1 0 0 0 3.6 2.1L16.5 5a2.1 2.1 0 0 0-3.6-2.1Z" fill="currentColor" />
    <circle cx="5.3" cy="14.1" r="2.1" fill="currentColor" opacity=".8" />
  </svg>
)
