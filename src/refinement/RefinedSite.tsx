import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Wordmark } from '../components/Brand'
import { Seo } from '../components/Seo'
import { ArrowUpRight, ShopBag, SearchIcon } from '../components/icons'
import { useToast } from '../components/Toast'
import { LOGOS } from '../lib/assets'
import { usePrefersReducedMotion } from '../lib/motion'
import './refinement.css'

type Route = 'a' | 'b'
const ASSETS = '/images/refinement/'

/** High-resolution masters are archived; browsers select AVIF or WebP by rendered size. */
function NatureImage({
  scene,
  className,
  sizes,
  alt,
  eager = false,
}: {
  scene: 'coastal-morning' | 'hillside'
  className?: string
  sizes: string
  alt: string
  eager?: boolean
}) {
  const widths =
    scene === 'coastal-morning' ? [800, 1440, 2400, 3840] : [800, 1440, 2400]
  const sources = (format: string) =>
    widths
      .map((width) => `${ASSETS}${scene}-${width}.${format} ${width}w`)
      .join(', ')
  return (
    <picture className="hm-nature-picture">
      <source type="image/avif" srcSet={sources('avif')} sizes={sizes} />
      <img
        className={className}
        src={`${ASSETS}${scene}-1440.webp`}
        srcSet={sources('webp')}
        sizes={sizes}
        width={scene === 'coastal-morning' ? 7088 : 4480}
        height={scene === 'coastal-morning' ? 3536 : 5600}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        {...{ fetchpriority: eager ? 'high' : 'auto' }}
      />
    </picture>
  )
}

function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return diagonal ? (
    <ArrowUpRight width={18} height={18} />
  ) : (
    <span aria-hidden>→</span>
  )
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function BookingButton({
  className = '',
  children = 'Book a call',
}: {
  className?: string
  children?: ReactNode
}) {
  const { show } = useToast()
  return (
    <button
      type="button"
      className={`hm-button ${className}`}
      onClick={() =>
        show(
          'Booking preview — the final scheduling link will be connected before launch.',
        )
      }
    >
      <span>{children}</span>
      <Arrow />
    </button>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [open])
  const items = [
    ['Our approach', '#approach'],
    ['Our people', '#people'],
    ['Kind words', '#kind-words'],
  ]
  return (
    <header className="hm-header hm-container">
      <a className="hm-home" href="#top" aria-label="Happy Mondays home">
        <Wordmark size="lg" />
      </a>
      <nav className="hm-desktop-nav" aria-label="Main navigation">
        {items.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="hm-header-actions">
        <BookingButton className="hm-button-small" />
        <button
          ref={menuButton}
          className="hm-menu-button"
          aria-expanded={open}
          aria-controls="hm-mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <span className={open ? 'is-open' : ''} />
          <span className={open ? 'is-open' : ''} />
        </button>
      </div>
      {open && (
        <nav
          id="hm-mobile-menu"
          className="hm-mobile-menu"
          aria-label="Mobile navigation"
        >
          {items.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <Arrow />
            </a>
          ))}
          <BookingButton />
        </nav>
      )}
    </header>
  )
}

function PartnerLine() {
  return (
    <div className="hm-partners">
      <span>
        <span className="hm-stars" aria-label="5 stars">
          ★★★★★
        </span>{' '}
        5.0 on Clutch
      </span>
      <i aria-hidden />
      <span>
        <img src="/images/icon-shopify.png" width="19" height="22" alt="" />{' '}
        Shopify Partner
      </span>
      <span>
        <img src="/images/icon-google-ads.svg" width="20" height="20" alt="" />{' '}
        Google Ads Partner
      </span>
    </div>
  )
}

function Chart({ month = false }: { month?: boolean }) {
  const id = useId().replace(/:/g, '')
  const path = month
    ? 'M0 158 C30 155 42 130 65 135 S105 153 135 119 S170 106 200 111 S241 65 275 73 S309 88 340 42 S385 35 414 18'
    : 'M0 155 C25 155 31 134 62 138 S109 158 135 128 S178 126 207 100 S250 112 279 74 S316 86 345 48 S389 49 414 26'
  return (
    <svg
      viewBox="0 0 414 190"
      role="img"
      aria-label={`Illustrative ${month ? 'monthly' : 'weekly'} sales trend`}
      className="hm-chart"
    >
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#426fed" stopOpacity=".16" />
          <stop offset="100%" stopColor="#426fed" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 75, 125, 175].map((y) => (
        <line
          key={y}
          x1="0"
          x2="414"
          y1={y}
          y2={y}
          stroke="#e8eced"
          strokeDasharray="3 5"
        />
      ))}
      <path
        d="M0 164 C38 153 62 173 100 149 S160 163 200 143 S260 151 300 123 S362 128 414 111"
        stroke="#bbc2ca"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        fill="none"
      />
      <path d={`${path} L414 190 L0 190 Z`} fill={`url(#${id})`} />
      <path d={path} stroke="#3564e5" strokeWidth="2.5" fill="none" />
      <circle
        cx="414"
        cy={month ? 18 : 26}
        r="4"
        fill="#3564e5"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  )
}

function CommerceWindow({ interactive = false }: { interactive?: boolean }) {
  const [month, setMonth] = useState(false)
  return (
    <div className="hm-commerce-window">
      <aside className="hm-commerce-sidebar" aria-hidden="true">
        <div className="hm-store">
          <img src="/images/icon-shopify.png" alt="" />
          Your store
        </div>
        {[
          'Home',
          'Orders',
          'Products',
          'Customers',
          'Marketing',
          'Analytics',
        ].map((label, i) => (
          <div className={i === 5 ? 'selected' : ''} key={label}>
            <span>{['⌂', '▤', '◇', '♧', '↗', '▥'][i]}</span>
            {label}
          </div>
        ))}
        <span className="hm-sidebar-bottom">Settings</span>
      </aside>
      <div className="hm-commerce-main">
        <div className="hm-commerce-top">
          <span>Analytics</span>
          {interactive ? (
            <button
              className="hm-period"
              onClick={() => setMonth(!month)}
              aria-label={`Showing last ${month ? '30' : '7'} days. Switch to last ${month ? '7' : '30'} days.`}
            >
              {month ? 'Last 30 days' : 'Last 7 days'}{' '}
              <span aria-hidden>⌄</span>
            </button>
          ) : (
            <span className="hm-period">
              Last 7 days <span aria-hidden>⌄</span>
            </span>
          )}
        </div>
        <div className="hm-commerce-stats">
          <div>
            <span>Total sales</span>
            <strong>{month ? '$486,920' : '$128,460'}</strong>
            <small>↗ {month ? '28.6' : '24.8'}%</small>
          </div>
          <div>
            <span>Orders</span>
            <strong>{month ? '6,928' : '1,842'}</strong>
            <small>↗ 18.6%</small>
          </div>
          <div>
            <span>Conversion rate</span>
            <strong>
              3.4<span>%</span>
            </strong>
            <small>↗ 0.6pt</small>
          </div>
        </div>
        <div className="hm-chart-title">
          <span>Total sales over time</span>
          <span>
            <i /> This {month ? 'month' : 'week'}
          </span>
        </div>
        <Chart month={month} />
        <div className="hm-chart-axis">
          {(month
            ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          ).map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeroA() {
  const reduced = usePrefersReducedMotion()
  return (
    <section className="hm-hero-a" aria-labelledby="hero-heading">
      <div className="hm-hero-copy hm-container">
        <Reveal>
          <p className="hm-eyebrow">
            <span /> Google Ads for Shopify brands
          </p>
          <h1 id="hero-heading">
            Open Shopify.
            <br className="hm-mobile-break" /> <em>Smile.</em>
          </h1>
          <p className="hm-hero-description">
            A clearer path to growth.
            <br />
            Senior expertise. One flat monthly fee.
          </p>
          <div className="hm-hero-actions">
            <BookingButton />
            <a className="hm-text-link" href="#approach">
              Meet your growth partner <Arrow diagonal={false} />
            </a>
          </div>
        </Reveal>
      </div>
      <div className="hm-landscape-stage">
        <NatureImage
          scene="coastal-morning"
          className="hm-scene-image"
          sizes="(min-width:1700px) 1650px, calc(100vw - 48px)"
          alt="Morning sunlight on limestone beside a quiet blue Mediterranean sea"
          eager
        />
        <div className="hm-scene-note">
          <span className="hm-status-dot" /> A better start to the week.
        </div>
        <motion.div
          className="hm-hero-dashboard"
          initial={reduced ? false : { opacity: 0, y: 25, rotate: 1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <CommerceWindow />
          <div className="hm-order-note">
            <span className="hm-order-bag">
              <ShopBag width={20} height={20} />
            </span>
            <div>
              <strong>Another good moment.</strong>
              <span>New order · $79.00</span>
            </div>
            <span className="hm-order-check">✓</span>
          </div>
        </motion.div>
        <span className="hm-demo-caption">Illustrative store data</span>
      </div>
      <PartnerLine />
    </section>
  )
}

function HeroB() {
  return (
    <section className="hm-hero-b" aria-labelledby="hero-heading">
      <div className="hm-b-intro hm-container">
        <Reveal className="hm-b-copy">
          <p className="hm-eyebrow">
            <span /> Google Ads for Shopify brands
          </p>
          <h1 id="hero-heading">
            Open Shopify.
            <br />
            <em>Smile.</em>
          </h1>
          <p className="hm-hero-description">
            Your business, growing.
            <br />
            Your Mondays, looking up.
          </p>
          <p className="hm-b-description">
            Senior Google Ads expertise, a considered approach to your whole
            store, and one flat monthly fee.
          </p>
          <BookingButton />
          <a href="#approach" className="hm-b-scroll">
            A little more room to grow <span aria-hidden>↓</span>
          </a>
        </Reveal>
        <div className="hm-b-photo">
          <NatureImage
            scene="hillside"
            sizes="(max-width:700px) calc(100vw - 40px), (min-width:1400px) 663px, 52vw"
            alt="A sunlit coastal hillside opening out towards the blue sea"
            eager
          />
          <div className="hm-b-photo-note">
            <span>
              Clarity. Confidence.
              <br />
              And room for what's next.
            </span>
            <span aria-hidden>↗</span>
          </div>
        </div>
      </div>
      <PartnerLine />
    </section>
  )
}

function Brands() {
  return (
    <section className="hm-brands hm-container" aria-label="Client brands">
      <p>In good company.</p>
      <div>
        {LOGOS.slice(0, 6).map((logo) => (
          <img
            key={logo.name}
            src={logo.src.replace('/images/', ASSETS)}
            alt={logo.name}
            width="164"
            height="72"
          />
        ))}
      </div>
    </section>
  )
}

function Founder() {
  return (
    <section id="people" className="hm-founder hm-container">
      <Reveal className="hm-founder-photo">
        <img
          src={`${ASSETS}keanu-960.webp`}
          srcSet={`${ASSETS}keanu-480.webp 480w, ${ASSETS}keanu-960.webp 960w, ${ASSETS}keanu-1600.webp 1600w`}
          sizes="(max-width: 700px) 90vw, 40vw"
          alt="Keanu Fischell, founder of Happy Mondays"
          width="960"
          height="640"
          loading="lazy"
        />
        <div className="hm-founder-name">
          <span>Keanu Fischell</span>
          <small>Founder · Previously at Google</small>
        </div>
      </Reveal>
      <Reveal className="hm-founder-copy" delay={0.1}>
        <p className="hm-eyebrow">Good people. Proper expertise.</p>
        <h2>
          A partner who sees
          <br />
          the whole picture.
        </h2>
        <p>
          Your ads are only part of the story. Your products, your margins and
          the experience after the click all shape what happens next.
        </p>
        <p>
          Founded by Keanu after four years at Google, Happy Mondays brings that
          wider perspective to your Shopify business. You'll work directly with
          the people doing the work.
        </p>
        <a href="#approach" className="hm-text-link">
          Get to know our approach <Arrow diagonal={false} />
        </a>
      </Reveal>
    </section>
  )
}

function Approach({ route }: { route: Route }) {
  return (
    <section
      id="approach"
      className={`hm-approach hm-container ${route === 'b' ? 'hm-approach-b' : ''}`}
    >
      <Reveal className="hm-section-intro">
        <p className="hm-eyebrow">The Happy Mondays approach</p>
        <h2>
          Good ads are the start.
          <br />
          <span>Growth is the bigger picture.</span>
        </h2>
        <p>
          We connect what happens in your ad account with what happens in your
          store.
        </p>
      </Reveal>
      <div className="hm-approach-grid">
        <Reveal className="hm-approach-card hm-feed-card">
          <div className="hm-approach-art hm-feed-art" aria-hidden="true">
            <div className="hm-mini-product">
              <img
                src="/images/refinement/product-juliet.webp"
                alt=""
                width="358"
                height="247"
                loading="lazy"
              />
              <span>
                <small>Juliet Grip Sock</small>
                <strong>Ready to be found.</strong>
              </span>
              <i>✓</i>
            </div>
            <div className="hm-feed-rows">
              {[
                'Product titles',
                'Tracking & conversion value',
                'Campaign structure',
              ].map((t) => (
                <div key={t}>
                  <span>{t}</span>
                  <span>✓</span>
                </div>
              ))}
            </div>
            <span className="hm-art-note">
              Better inputs. Better decisions.
            </span>
          </div>
          <div className="hm-card-copy">
            <span className="hm-number">01 / IN THE ACCOUNT</span>
            <h3>Get the foundations right.</h3>
            <p>
              Clean tracking, useful product data and campaigns built around
              what makes your business money.
            </p>
          </div>
        </Reveal>
        <Reveal className="hm-approach-card hm-journey-card" delay={0.08}>
          <div className="hm-approach-art hm-journey-art" aria-hidden="true">
            <div className="hm-journey-header">
              <ShopBag width={22} height={22} />
              <span>Every detail adds up.</span>
            </div>
            <div className="hm-journey-line">
              {['The search', 'The product', 'The checkout'].map((s, i) => (
                <div key={s}>
                  <span>{['↗', '◇', '✓'][i]}</span>
                  <small>{s}</small>
                </div>
              ))}
            </div>
            <div className="hm-journey-tags">
              <span>Product feeds</span>
              <span>Offers & bundles</span>
              <span>Conversion</span>
            </div>
          </div>
          <div className="hm-card-copy">
            <span className="hm-number">02 / BEYOND THE CLICK</span>
            <h3>Make more of every visit.</h3>
            <p>
              Better landing pages, thoughtful merchandising and stronger
              offers. The details that help a visit become a sale.
            </p>
          </div>
        </Reveal>
        <Reveal className="hm-approach-card hm-partner-card" delay={0.16}>
          <div className="hm-approach-art hm-partner-art" aria-hidden="true">
            <div className="hm-note-heading">
              <span className="hm-note-avatar">HM</span>
              <div>
                <strong>Your Monday update</strong>
                <small>A clear view of the week.</small>
              </div>
              <span>↗</span>
            </div>
            <div className="hm-monday-note">
              <div>
                <span className="hm-note-dot" />
                <span>What's working</span>
              </div>
              <div>
                <span className="hm-note-dot neutral" />
                <span>What we're improving</span>
              </div>
              <div>
                <span className="hm-note-dot blue" />
                <span>What happens next</span>
              </div>
            </div>
            <span className="hm-art-note">
              From your strategist. In plain English.
            </span>
          </div>
          <div className="hm-card-copy">
            <span className="hm-number">03 / ALONGSIDE YOU</span>
            <h3>Know where you stand.</h3>
            <p>
              Direct access to your strategist, clear Monday updates and a flat
              fee. A working relationship built on clarity.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const SERVICES = [
  {
    id: 'shopping',
    title: 'Shopping',
    text: 'Help the right products find the right people.',
    body: 'Richer product data. Better campaign structure. Bids that make sense for your margins.',
    note: 'A clearer route from product to purchase.',
  },
  {
    id: 'search',
    title: 'Search',
    text: 'Be there when intent turns into action.',
    body: 'Relevant search terms and useful ads, connected to a landing page that delivers on the promise.',
    note: 'The right message, at the right moment.',
  },
  {
    id: 'pmax',
    title: 'Performance Max',
    text: 'Bring the moving parts together.',
    body: 'Product feeds, creative and conversion signals working towards your commercial goals.',
    note: 'One considered view of the whole campaign.',
  },
  {
    id: 'youtube',
    title: 'YouTube',
    text: 'Give new customers a reason to care.',
    body: 'Introduce your products with considered video creative, then connect interest to your store.',
    note: 'Make the product the story.',
  },
  {
    id: 'reporting',
    title: 'Reporting',
    text: 'Start the week with a clearer picture.',
    body: 'Understand your spend, your sales and what we are doing next. No decoding required.',
    note: 'Less noise. More useful answers.',
  },
]

function ProductCards() {
  return (
    <div className="hm-shopping-products">
      {[
        ['refinement/product-juliet.webp', 'Juliet Grip Sock', 'Baby blue'],
        ['product-checkered.webp', 'Checkered Grip Sock', 'Off-white / pink'],
        [
          'refinement/product-crewstripe.webp',
          'Crew Stripe Grip Sock',
          'White / rose',
        ],
      ].map(([src, title, colour]) => (
        <div key={src}>
          <div className="hm-product-image">
            <img
              src={`/images/${src}`}
              alt={`${title} by Lucky Honey`}
              width="358"
              height="247"
              loading="lazy"
            />
          </div>
          <span>Lucky Honey</span>
          <strong>{title}</strong>
          <small>{colour}</small>
          <b>$18.00</b>
        </div>
      ))}
    </div>
  )
}

function ServiceGraphic({ id }: { id: string }) {
  if (id === 'shopping')
    return (
      <div className="hm-shopping-window">
        <div className="hm-search-field">
          <SearchIcon width={18} height={18} />
          <span>your next favourite grip socks</span>
          <span aria-hidden>⌕</span>
        </div>
        <div className="hm-sponsored">
          Sponsored products <span>Lucky Honey</span>
        </div>
        <ProductCards />
        <div className="hm-shopping-bottom">
          <span className="hm-status-dot" /> Thoughtful feeds. Discoverable
          products.
        </div>
      </div>
    )
  if (id === 'search')
    return (
      <div className="hm-search-window">
        <div className="hm-search-field">
          <SearchIcon />
          <span>pilates grip socks</span>
        </div>
        <div className="hm-search-result">
          <small>Sponsored · luckyhoney.nyc</small>
          <strong>Pilates grip socks. Meet your perfect pair.</strong>
          <p>
            Made for the studio. Styled for everywhere. Explore grip socks from
            Lucky Honey.
          </p>
          <div>
            <span>Shop grip socks</span>
            <span>Explore colours</span>
          </div>
        </div>
        <div className="hm-search-connection">
          <span>Clear intent</span>
          <i>→</i>
          <span>Relevant ad</span>
          <i>→</i>
          <span>The right page</span>
        </div>
      </div>
    )
  if (id === 'pmax')
    return (
      <div className="hm-pmax-window">
        <span className="hm-graphic-label">Everything working together</span>
        <div className="hm-orbit">
          <div className="hm-orbit-core">
            <img
              src="/images/icon-google-ads.svg"
              alt="Google Ads"
              width="32"
              height="32"
            />
            <strong>Your growth goals</strong>
          </div>
          {['Shopping', 'Search', 'YouTube', 'Display'].map((name, i) => (
            <span className={`hm-orbit-node node-${i}`} key={name}>
              {name}
            </span>
          ))}
        </div>
        <div className="hm-pmax-inputs">
          <span>Product data</span>
          <span>Creative</span>
          <span>Conversion signals</span>
        </div>
      </div>
    )
  if (id === 'youtube')
    return (
      <div className="hm-youtube-window">
        <div className="hm-video-story">
          <img
            src="/images/refinement/product-juliet.webp"
            alt="Lucky Honey blue grip socks"
            width="358"
            height="247"
            loading="lazy"
          />
          <span className="hm-video-brand">LUCKY HONEY</span>
          <strong>
            Find your
            <br />
            happy place.
          </strong>
          <span className="hm-video-caption">
            Creative direction · illustrative placement
          </span>
        </div>
        <div className="hm-video-product">
          <span>
            Juliet Grip Sock
            <br />
            <small>Lucky Honey · $18.00</small>
          </span>
          <span className="hm-video-shop">Explore the product ↗</span>
        </div>
      </div>
    )
  return (
    <div className="hm-report-window">
      <div className="hm-report-top">
        <span className="hm-note-avatar">HM</span>
        <span>
          <strong>Your Monday, made clearer.</strong>
          <small>Weekly performance overview</small>
        </span>
        <span aria-hidden>↗</span>
      </div>
      <div className="hm-report-metrics">
        <div>
          <span>Ad spend</span>
          <strong>$4,280</strong>
        </div>
        <div>
          <span>Conversion value</span>
          <strong>$21,614</strong>
        </div>
        <div>
          <span>ROAS</span>
          <strong>5.05</strong>
        </div>
      </div>
      <Chart />
      <div className="hm-report-bottom">
        <span>What's working</span>
        <span>What's next</span>
        <span>Questions? Just ask.</span>
      </div>
    </div>
  )
}

function Services() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const reduced = usePrefersReducedMotion()
  const current = SERVICES[active]
  return (
    <section className="hm-services" id="services">
      <div className="hm-container">
        <Reveal className="hm-services-heading">
          <p className="hm-eyebrow">Considered from every angle</p>
          <h2>
            The right moves.
            <br />
            <span>For your kind of growth.</span>
          </h2>
        </Reveal>
        <div className="hm-service-layout">
          <div className="hm-service-controls">
            <div
              role="tablist"
              aria-label="Explore our Google Ads services"
              className="hm-service-tabs"
              onKeyDown={(event) => {
                let next = active
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
                  next = (active + 1) % SERVICES.length
                else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
                  next = (active + SERVICES.length - 1) % SERVICES.length
                else if (event.key === 'Home') next = 0
                else if (event.key === 'End') next = SERVICES.length - 1
                else return
                event.preventDefault()
                setActive(next)
                refs.current[next]?.focus()
              }}
            >
              {SERVICES.map((service, i) => (
                <button
                  key={service.id}
                  ref={(el) => {
                    refs.current[i] = el
                  }}
                  id={`tab-${service.id}`}
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`panel-${service.id}`}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                >
                  <span>{service.title}</span>
                  <span aria-hidden>{active === i ? '↗' : '+'}</span>
                </button>
              ))}
            </div>
            <div className="hm-service-copy">
              <h3>{current.text}</h3>
              <p>{current.body}</p>
            </div>
          </div>
          <div
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            tabIndex={0}
            className={`hm-service-stage hm-stage-${current.id}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: reduced ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 0.22 }}
                className="hm-service-graphic"
              >
                <ServiceGraphic id={current.id} />
              </motion.div>
            </AnimatePresence>
            <p className="hm-service-footnote">
              {current.note}
              <span>Illustrative example</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonial() {
  return (
    <section id="kind-words" className="hm-testimonial hm-container">
      <Reveal>
        <p className="hm-eyebrow">A good word from good company</p>
        <blockquote>
          “Their knowledge of Google Ads is second to none and they are
          constantly finding new ways to scale and grow.”
        </blockquote>
        <div className="hm-quote-credit">
          <span className="hm-quote-monogram" aria-hidden>
            TD
          </span>
          <p>
            <strong>Gary Ingram</strong>
            <span>Co-Founder, The Diamond Store</span>
          </p>
        </div>
      </Reveal>
    </section>
  )
}

function Closing() {
  return (
    <>
      <section id="lets-talk" className="hm-closing hm-container">
        <div className="hm-closing-inner">
          <p className="hm-eyebrow">Here's to better Mondays.</p>
          <h2>
            Let's talk about
            <br />
            <span>what comes next.</span>
          </h2>
          <p>Your store. Your ambitions. A straightforward conversation.</p>
          <BookingButton />
          <div className="hm-closing-note">
            <img
              src={`${ASSETS}keanu-480.webp`}
              width="48"
              height="48"
              alt=""
              loading="lazy"
            />
            <span>
              A conversation with Keanu.
              <br />
              <strong>A clearer sense of the possibilities.</strong>
            </span>
          </div>
        </div>
        <div className="hm-closing-landscape" aria-hidden="true">
          <NatureImage
            scene="coastal-morning"
            sizes="(max-width:700px) 100vw, 50vw"
            alt=""
          />
        </div>
      </section>
    </>
  )
}

function Footer({ route }: { route: Route }) {
  const reduced = usePrefersReducedMotion()
  return (
    <footer className="hm-footer hm-container">
      <a href="#top" aria-label="Back to top">
        <Wordmark size="lg" />
      </a>
      <p>Google Ads. Shopify growth. Happy Mondays.</p>
      <a
        href={`${route === 'a' ? '/concept-b' : '/concept-a'}${reduced ? '?motion=reduce' : ''}`}
        className="hm-review-switch"
      >
        View concept {route === 'a' ? 'B' : 'A'} <Arrow />
      </a>
    </footer>
  )
}

function BCommerce() {
  return (
    <section className="hm-b-commerce hm-container">
      <Reveal className="hm-b-commerce-copy">
        <p className="hm-eyebrow">From the first click onwards</p>
        <h2>
          More clarity.
          <br />
          <span>Better decisions.</span>
        </h2>
        <p>
          Your Shopify store and Google Ads account tell one story. We bring the
          pieces together, so you can see where to go next.
        </p>
        <a href="#services" className="hm-text-link">
          See how it comes together <Arrow diagonal={false} />
        </a>
      </Reveal>
      <Reveal className="hm-b-commerce-stage">
        <CommerceWindow interactive />
        <span className="hm-example-label">
          Illustrative store data · try changing the date range
        </span>
      </Reveal>
    </section>
  )
}

export default function RefinedSite({ route }: { route: Route }) {
  const reduced = usePrefersReducedMotion()
  return (
    <div
      className={`hm-refined hm-route-${route}`}
      data-motion={reduced ? 'reduce' : 'full'}
    >
      <Seo
        title={`Concept ${route.toUpperCase()} — ${route === 'a' ? 'A clearer outlook' : 'Room to grow'} · Happy Mondays`}
      />
      <a className="hm-skip" href="#main-content">
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main-content" tabIndex={-1}>
        {route === 'a' ? <HeroA /> : <HeroB />}
        <Brands />
        <Founder />
        {route === 'b' && <BCommerce />}
        <Approach route={route} />
        <Services />
        <Testimonial />
        <Closing />
      </main>
      <Footer route={route} />
    </div>
  )
}
