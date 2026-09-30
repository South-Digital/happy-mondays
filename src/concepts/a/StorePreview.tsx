import { useId } from "react";
import { motion } from "framer-motion";
import {
  AnalyticsIcon,
  ChevronDown,
  CustomersIcon,
  HomeIcon,
  MarketingIcon,
  OrdersIcon,
  ProductsIcon,
  ArrowUpRight,
} from "../../components/icons";
import { segment, settle } from "./useSceneTimeline";

const nav = [
  { text: "Home", Icon: HomeIcon },
  { text: "Orders", Icon: OrdersIcon },
  { text: "Products", Icon: ProductsIcon },
  { text: "Customers", Icon: CustomersIcon },
  { text: "Marketing", Icon: MarketingIcon },
  { text: "Analytics", Icon: AnalyticsIcon },
];
const sample = {
  line: "M0 152 C30 152 40 139 65 143 S108 128 132 134 S178 106 199 116 S234 112 265 101 S297 118 332 90 S365 87 398 63 S440 79 465 51 S498 61 530 31 S570 37 598 20",
  dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

/** A presentational Shopify-style object. All data is illustrative. */
export function StorePreview({ time }: { time: number }) {
  const data = sample;
  const fillId = useId().replace(/:/g, "");
  const entrance = settle(segment(time, 60, 900));
  const chart = settle(segment(time, 1350, 2750));
  const newOrder = settle(segment(time, 3550, 650));
  const sales = Math.round(128381 * settle(segment(time, 1100, 2050)) + 79 * newOrder);
  const orders = Math.round(1841 * settle(segment(time, 1140, 2150))) + (newOrder > 0 ? 1 : 0);
  const metrics = [
    ["Total sales", "$" + sales.toLocaleString("en-US"), "24.8%"],
    ["Orders", orders.toLocaleString("en-US"), "18.6%"],
    ["Conversion rate", (3.4 * settle(segment(time, 1130, 2200))).toFixed(1) + "%", "0.6pt"],
    ["ROAS", (5.05 * settle(segment(time, 1270, 2200))).toFixed(2) + "×", "0.42×"],
  ];
  return (
    // Fade the glass itself: fading an ancestor temporarily blocks its backdrop.
    <motion.div
      className="ha-store"
      style={{ opacity: entrance, y: 30 * (1 - entrance), scale: .985 + .015 * entrance }}
      role="group"
      aria-label="Illustrative Shopify analytics"
    >
      <div className="ha-store-interior">
        <aside className="ha-store-sidebar" aria-hidden="true">
          <div className="ha-store-brand">
            <img src="/images/icon-shopify.png" width="19" height="23" alt="" />
            <strong>Your store</strong>
            <ChevronDown width={12} height={12} />
          </div>
          <div className="ha-store-menu">
            {nav.map(({ text, Icon }, index) => (
              <div
                key={text}
                style={{ opacity: settle(segment(time, 200 + index * 45, 450)), transform: `translateY(${3 * (1 - settle(segment(time, 200 + index * 45, 450)))}px)` }}
                className={text === "Analytics" ? "is-active" : ""}
              >
                <Icon width={15} height={15} />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className="ha-store-channel">
            <span>Sales channels</span>
            <span>+</span>
          </div>
          <div className="ha-store-channel-item">
            <span aria-hidden="true">▤</span> Online Store
          </div>
          <div className="ha-store-channel-item">
            <span aria-hidden="true">G</span> Google & YouTube
          </div>
        </aside>
        <div className="ha-store-main">
          <div className="ha-store-heading">
            <h2>Analytics</h2>
            <span className="ha-store-range">Last 7 days</span>
          </div>
          <div className="ha-store-metrics">
            {metrics.map(([label, value, change], index) => (
              <div key={label} aria-label={`${label}: ${["$128,460", "1,842", "3.4%", "5.05 times"][index]}. Illustrative.`}>
                <span className="ha-metric-label">{label}</span>
                <strong aria-hidden="true">{value}</strong>
                {change && (
                  <span className="ha-metric-change" style={{ opacity: settle(segment(time, 2300 + index * 110, 850)) }}>
                    <ArrowUpRight width={10} height={10} />
                    {change}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="ha-chart-title">
            <h3>Total sales over time</h3>
            <div>
              <span>Last 7 days</span>
              <span>Previous 7 days</span>
            </div>
          </div>
          <div
            className="ha-chart"
            role="img"
            aria-label="Illustrative sales chart for the last 7 days; not a client result."
          >
            <div className="ha-chart-scale">
              <span>$24K</span>
              <span>$12K</span>
              <span>$0</span>
            </div>
            <div className="ha-chart-plot">
              <svg
                viewBox="0 0 600 190"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6a97dd" stopOpacity=".16" />
                    <stop offset="100%" stopColor="#6a97dd" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id={`${fillId}-reveal`}><rect x="-3" y="-5" width={606 * chart} height="200" /></clipPath>
                </defs>
                <g stroke="#dfe3e8" strokeWidth=".7" strokeDasharray="2 5">
                  <path d="M0 12H600M0 96H600M0 180H600" />
                </g>

                <path
                  d="M0 166 C60 161 75 153 130 159 S201 139 265 146 S337 126 398 133 S456 107 529 117 S574 106 598 100"
                  stroke="#c5ced8"
                  fill="none"
                  strokeWidth="1.5"
                  strokeDasharray="3 5"
                />
                <g clipPath={`url(#${fillId}-reveal)`}>
                  <path d={`${data.line} L598 190H0Z`} fill={`url(#${fillId})`} />
                  <path d={data.line} fill="none" stroke="#648dcc" strokeWidth="2.2" strokeLinecap="round" />
                </g>
                <g opacity={settle(segment(time, 3550, 650))}>
                  <circle cx="598" cy="20" r="7" fill="#648dcc" opacity=".12" />
                  <circle cx="598" cy="20" r="3" fill="#648dcc" stroke="white" strokeWidth="1.3" />
                </g>
              </svg>
              <div className="ha-chart-dates">
                {data.dates.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="ha-store-footer">
            <span>Compared with the previous 7 days</span>
            <span>
              View report <ArrowUpRight width={12} height={12} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function OrderPreview({ reveal }: { reveal: number }) {
  return (
    <motion.div className="ha-order" style={{ opacity: reveal, y: 16 * (1 - reveal), scale: .97 + .03 * reveal }} aria-hidden={reveal < 0.9}>
      <span className="ha-order-icon">
        <img src="/images/icon-shopify.png" width="24" height="29" alt="" />
      </span>
      <div><strong>New order</strong><span>#1048 · $79.00</span></div>
      <span className="ha-order-time"><span className="ha-order-dot" />Just now</span>
    </motion.div>
  );
}
