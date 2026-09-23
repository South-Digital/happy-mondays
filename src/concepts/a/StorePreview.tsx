import { useId, useState } from "react";
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
import { usePrefersReducedMotion } from "../../lib/motion";

const nav = [
  { text: "Home", Icon: HomeIcon },
  { text: "Orders", Icon: OrdersIcon },
  { text: "Products", Icon: ProductsIcon },
  { text: "Customers", Icon: CustomersIcon },
  { text: "Marketing", Icon: MarketingIcon },
  { text: "Analytics", Icon: AnalyticsIcon },
];
const sample = {
  week: {
    sales: "$128,460",
    orders: "1,842",
    rate: "3.4%",
    roas: "5.05",
    line: "M0 152 C30 152 40 139 65 143 S108 128 132 134 S178 106 199 116 S234 112 265 101 S297 118 332 90 S365 87 398 63 S440 79 465 51 S498 61 530 31 S570 37 598 20",
    dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  month: {
    sales: "$486,280",
    orders: "7,018",
    rate: "3.2%",
    roas: "4.86",
    line: "M0 162 C30 160 41 136 68 144 S104 151 130 117 S168 131 197 101 S235 113 267 92 S298 99 330 60 S367 81 398 54 S432 72 462 39 S500 53 528 23 S570 26 598 10",
    dates: ["1 Sep", "5 Sep", "10 Sep", "15 Sep", "20 Sep", "25 Sep", "30 Sep"],
  },
};

/** A deliberately native, editable Shopify-style object. All data is illustrative. */
export function StorePreview() {
  const [range, setRange] = useState<"week" | "month">("week");
  const data = sample[range];
  const fillId = useId().replace(/:/g, "");
  const reduced = usePrefersReducedMotion();
  return (
    <div
      className="ha-store"
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
            {nav.map(({ text, Icon }) => (
              <div
                key={text}
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
            <label className="ha-store-range">
              <span className="sr-only">Illustrative analytics date range</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="3"
                  width="12"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                />
                <path d="M5 1v4m6-4v4M2 7h12" stroke="currentColor" />
              </svg>
              <span className="ha-store-range-value" aria-hidden="true">
                {range === "week" ? "Last 7 days" : "Last 30 days"}
              </span>
              <select
                value={range}
                onChange={(e) => setRange(e.target.value as "week" | "month")}
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
              </select>
              <ChevronDown width={12} height={12} />
            </label>
          </div>
          <div
            className="ha-store-metrics"
            aria-live="polite"
            aria-atomic="true"
          >
            {[
              ["Total sales", data.sales, "24.8%"],
              ["Orders", data.orders, "18.6%"],
              ["Conversion rate", data.rate, "0.6pt"],
              ["ROAS", data.roas, ""],
            ].map(([label, value, change]) => (
              <div key={label}>
                <span className="ha-metric-label">{label}</span>
                <strong>{value}</strong>
                {change && (
                  <span className="ha-metric-change">
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
              <span>Selected period</span>
              <span>Previous period</span>
            </div>
          </div>
          <div
            className="ha-chart"
            role="img"
            aria-label={`Illustrative sales chart for the last ${range === "week" ? "7" : "30"} days; not a client result.`}
          >
            <div className="ha-chart-scale">
              <span>{range === "week" ? "$24K" : "$100K"}</span>
              <span>{range === "week" ? "$12K" : "$50K"}</span>
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
                </defs>
                <g stroke="#dfe3e8" strokeWidth=".7" strokeDasharray="2 5">
                  <path d="M0 12H600M0 96H600M0 180H600" />
                </g>
                <path d={`${data.line} L598 190H0Z`} fill={`url(#${fillId})`} />
                <path
                  d="M0 166 C60 161 75 153 130 159 S201 139 265 146 S337 126 398 133 S456 107 529 117 S574 106 598 100"
                  stroke="#c5ced8"
                  fill="none"
                  strokeWidth="1.5"
                  strokeDasharray="3 5"
                />
                <motion.path
                  key={range}
                  d={data.line}
                  fill="none"
                  stroke="#5d87cf"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: reduced ? 0 : 1.1,
                    delay: range === "week" ? 0.5 : 0,
                    ease: "easeOut",
                  }}
                />
              </svg>
              <div className="ha-chart-dates">
                {data.dates.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="ha-store-footer">
            <span>Sales attributed to marketing</span>
            <span>
              View report <ArrowUpRight width={12} height={12} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrderPreview() {
  return (
    <div className="ha-order">
      <span className="ha-order-icon">
        <img src="/images/icon-shopify.png" width="24" height="29" alt="" />
      </span>
      <div>
        <strong>New order</strong>
        <span>#1048 · $79.00</span>
      </div>
      <span className="ha-order-time">Just now</span>
    </div>
  );
}
