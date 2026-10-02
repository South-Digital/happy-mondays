import { useId } from "react";
import { motion } from "framer-motion";
import { segment, settle } from "./useSceneTimeline";

const nav = [
  ["Home", "HomeFilled"], ["Orders", "OrderFilled"],
  ["Products", "ProductFilled"], ["Customers", "PersonFilled"],
  ["Marketing", "TargetFilled"], ["Discounts", "DiscountFilled"],
  ["Content", "ContentFilled"], ["Markets", "MarketsFilled"],
  ["Finance", "FinanceFilled"], ["Analytics", "ChartVerticalFilled"],
];
const days = ["Sep 23", "Sep 24", "Sep 25", "Sep 26", "Sep 27", "Sep 28", "Sep 29"];
// Daily totals sum to $128,460; previous period sums to $102,929 (+24.8%).
const salesByDay = [12350, 15420, 14280, 17690, 19800, 23740, 25180];
const previousByDay = [11500, 12800, 13700, 12200, 16800, 17500, 18429];
function points(values: number[], height = 160, ceiling = 30000) {
  return values.map((value, i) => `${i * 100},${height - value / ceiling * height}`).join(" ");
}
function Polaris({ name, className = "" }: { name: string; className?: string }) {
  return <img className={`ha-polaris ${className}`} src={`/images/shopify-ui/${name}.svg`} width="16" height="16" alt="" />;
}
function Sparkline({ values, progress }: { values: number[]; progress: number }) {
  return <svg className="ha-metric-spark" viewBox="0 0 600 44" preserveAspectRatio="none" aria-hidden="true">
    <polyline points={points(values, 38, Math.max(...values) * 1.25)} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress} />
  </svg>;
}

/** A simplified illustration of Shopify Analytics. All store data is fictional. */
export function StorePreview({ time }: { time: number }) {
  const id = useId().replace(/:/g, "");
  const entrance = settle(segment(time, 60, 900));
  const chart = settle(segment(time, 1050, 2350));
  const newOrder = settle(segment(time, 2800, 650));
  const sales = 96750 + Math.round(31631 * chart) + Math.round(79 * newOrder);
  const metrics = [
    { label: "Total sales", value: "$" + sales.toLocaleString("en-US"), change: "24.8%", points: salesByDay },
    { label: "Orders", value: (1841 + (newOrder >= 1 ? 1 : 0)).toLocaleString("en-US"), change: "18.6%", points: [178, 221, 205, 254, 284, 340, 360] },
    { label: "Conversion rate", value: "3.4%", change: "21.4%", points: [2.8, 3.1, 3, 3.3, 3.5, 3.6, 3.7] },
    { label: "Returning customer rate", value: "28.6%", change: "8.3%", points: [24, 26, 25, 28, 27, 30, 31] },
  ];
  return (
    <motion.div className="ha-store ha-admin" style={{ opacity: entrance, y: 42 * (1 - entrance), rotateX: 5 * (1 - entrance), transformPerspective: 1200, scale: .975 + .025 * entrance }}
      role="img" aria-label="Illustrative Shopify Analytics dashboard: $128,460 total sales, 1,842 orders, 3.4% conversion rate and 28.6% returning customer rate. Fictional store data, not client results.">
      <div className="ha-store-interior" aria-hidden="true">
        <aside className="ha-store-sidebar">
          <div className="ha-store-brand"><img src="/images/icon-shopify.png" width="20" height="24" alt="" /><strong>Your store</strong><Polaris name="ChevronDown" /></div>
          <div className="ha-store-menu">
            {nav.map(([text, icon]) => <div key={text} className={text === "Analytics" ? "is-active" : ""}>
              <Polaris name={icon} /><span>{text}</span>{text === "Orders" && <small>12</small>}
            </div>)}
            <div className="ha-admin-subnav">Reports</div><div className="ha-admin-subnav">Live View</div>
          </div>
          <div className="ha-store-channel"><span>Sales channels</span><Polaris name="ChevronDown" /></div>
          <div className="ha-store-channel-item"><Polaris name="StoreOnline" />Online Store</div>
          <div className="ha-admin-settings"><Polaris name="SettingsFilled" />Settings</div>
        </aside>
        <div className="ha-store-main">
          <div className="ha-store-heading"><h2><Polaris name="ChartVerticalFilled" />Analytics</h2><span className="ha-example-label">Illustrative store</span><div className="ha-admin-customize"><Polaris name="MenuHorizontal" /><span>Customize</span></div></div>
          <div className="ha-admin-filters"><span><Polaris name="Calendar" />Last 7 days<Polaris name="ChevronDown" /></span><span>Compare: Previous period<Polaris name="ChevronDown" /></span><span>USD $</span></div>
          <div className="ha-store-metrics">
            {metrics.map((metric, index) => <div key={metric.label} style={{ opacity: .4 + .6 * settle(segment(time, 900 + index * 80, 650)), transform: `translateY(${4 * (1 - settle(segment(time, 900 + index * 80, 650)))}px)` }}>
              <span className="ha-metric-label">{metric.label}</span><div className="ha-metric-value"><strong>{metric.value}</strong><span className="ha-metric-change"><Polaris name="ArrowUp" />{metric.change}</span></div>
              <Sparkline values={metric.points} progress={chart} />
            </div>)}
          </div>
          <div className="ha-sales-report">
            <div className="ha-chart-title"><h3>Total sales over time</h3><Polaris name="MenuHorizontal" /></div>

            <div className="ha-chart">
              <div className="ha-chart-scale"><span>$30K</span><span>$15K</span><span>$0</span></div>
              <div className="ha-chart-plot">
                <svg viewBox="0 0 600 160" preserveAspectRatio="none" aria-hidden="true">
                  <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4b9bbe" stopOpacity=".13" /><stop offset="100%" stopColor="#4b9bbe" stopOpacity="0" /></linearGradient><clipPath id={`${id}-reveal`}><rect x="-3" y="-5" width={606 * chart} height="170" /></clipPath></defs>
                  <g stroke="#eceeee" strokeWidth="1"><path d="M0 0H600M0 80H600M0 160H600" /></g>
                  <polyline points={points(previousByDay)} stroke="#9dc8d7" fill="none" strokeWidth="1.5" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
                  <g clipPath={`url(#${id}-reveal)`}><polygon points={`0,160 ${points(salesByDay)} 600,160`} fill={`url(#${id})`} /><polyline points={points(salesByDay)} fill="none" stroke="#4595b7" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" /></g>
                  <circle cx="600" cy={160 - salesByDay[6] / 30000 * 160} r="3" fill="#4595b7" stroke="white" strokeWidth="1.5" opacity={newOrder} />
                </svg>
                <div className="ha-chart-dates">{days.map(d => <span key={d}>{d}</span>)}</div>
              </div>
            </div>
            <div className="ha-chart-legend"><span>Sep 23–29</span><span>Sep 16–22</span></div>
          </div>
          <div className="ha-admin-note">Illustrative store data</div>
        </div>
      </div>
    </motion.div>
  );
}

export function OrderPreview({ reveal }: { reveal: number }) {
  return <motion.div className="ha-order" style={{ opacity: reveal, y: 16 * (1 - reveal), scale: .97 + .03 * reveal }} aria-hidden="true">
    <span className="ha-order-icon"><img src="/images/icon-shopify.png" width="24" height="29" alt="" /></span>
    <div><strong>New order</strong><span>#1048 · $79.00</span></div><span className="ha-order-time"><span className="ha-order-dot" />Just now</span>
  </motion.div>;
}
