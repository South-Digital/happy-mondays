import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useToast } from "../../components/Toast";
import { Wordmark } from "../../components/Brand";
import "./agency-story.css";

/** Keep planned destinations inspectable in the concept review. */
export function StoryLink({ href, children, className = "as-link", tabIndex }: { href: string; children: ReactNode; className?: string; tabIndex?: number }) {
  const { show } = useToast();
  return <a href={href} className={className} tabIndex={tabIndex} onClick={event => {
    event.preventDefault();
    show(href.startsWith("/book-a-call")
      ? "Booking preview — the calendar will be connected before launch."
      : "This page is part of the full site build.");
  }}>{children}</a>;
}

export function ClientStory() {
  return (
    <section className="as-proof" id="client-stories" tabIndex={-1} aria-label="A word from The Diamond Store">
      <div className="as-proof-source"><span className="as-quote-mark" aria-hidden="true">“</span><p>Gary Ingram<span>Co-Founder<br />The Diamond Store</span></p></div>
      <figure>
        <blockquote>“Their knowledge of Google Ads is second to none and they are <em>constantly finding new ways to scale and grow.</em>”</blockquote>
        <figcaption><StoryLink href="/case-studies/the-diamond-store">Read their story <span aria-hidden="true">↗</span></StoryLink></figcaption>
      </figure>
    </section>
  );
}

const auditPages = [
  { title: "Getting found.", tab: "Getting found", question: "Are the right people finding your products?", rows: [["Product feed", "Does Google understand your range?"], ["Search intent", "Do the searches match the products?"], ["Campaigns", "Where is the budget going?"]] },
  { title: "Choosing a product.", tab: "Choosing", question: "Is the page doing the product justice?", rows: [["Product pages", "Is the reason to buy clear?"], ["Pricing", "Does the offer make sense?"], ["Recommendations", "What belongs beside this product?"]] },
  { title: "Completing the order.", tab: "Buying", question: "What stands between interest and a sale?", rows: [["Basket", "Is the next step obvious?"], ["Delivery", "Are cost and timing easy to find?"], ["Checkout", "Where could a buyer hesitate?"]] },
];

function AuditFolio() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "ArrowRight" ? (index + 1) % auditPages.length
      : event.key === "ArrowLeft" ? (index + auditPages.length - 1) % auditPages.length
      : event.key === "Home" ? 0 : event.key === "End" ? auditPages.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };
  return <div className="as-audit-folio">
    <div className="as-folio-tabs" role="tablist" aria-label="Explore what the audit examines">
      {auditPages.map((item, index) => <button type="button" role="tab" key={item.title} id={`as-audit-tab-${index}`} ref={node => { tabs.current[index] = node; }} aria-selected={index === active} tabIndex={index === active ? 0 : -1} aria-controls={`as-audit-panel-${index}`} onKeyDown={event => navigate(event, index)} onClick={() => setActive(index)}><span aria-hidden="true">0{index + 1}</span>{item.tab}</button>)}
    </div>
    <div className="as-audit-pages">
      {auditPages.map((page, index) => <article key={page.title} role="tabpanel" id={`as-audit-panel-${index}`} aria-labelledby={`as-audit-tab-${index}`} aria-hidden={active !== index} tabIndex={active === index ? 0 : -1} className="as-audit-chapter" data-active={active === index}>
        <h3>{page.title}</h3>
        <p className="as-chapter-question">{page.question}</p>
        <dl>{page.rows.map(([label, question]) => <div key={label}><dt>{label}</dt><dd>{question}</dd></div>)}</dl>
      </article>)}
    </div>
  </div>;
}

const questions = [
  { title: "Is Happy Mondays right for my store?", answer: "We work with Shopify brands already running Google Ads, with historical data to learn from. Typically, that means at least 10,000 a month in ad spend in your local currency. If you’re below that with room to grow, we can talk it through." },
  { title: "Do you look beyond Google Ads?", answer: "Yes. We look at the account alongside your product pages, conversion rate and pricing. Better results depend on both. For paid social and email, we work with specialist partners." },
  { title: "How will I know what’s happening?", answer: "You have live dashboards, a Monday metrics update and a weekly written recap: what happened, the key numbers, what we’re working on and anything we need from you. Calls have a purpose, rather than filling the calendar." },
  { title: "What do I receive with the audit?", answer: "A detailed PDF and a personal Loom walkthrough explaining what we found and what to prioritise. We begin with a 15-minute conversation, then request access to Google Ads and, ideally, Shopify." },
];

export function GettingStarted() {
  return (
    <section className="as-start" id="getting-started" tabIndex={-1} aria-labelledby="as-start-title">
      <div className="as-audit-spread">
        <div className="as-audit-copy">
          <h2 id="as-start-title">Where does the next sale get stuck?</h2>
          <p>The Revenue Leak Audit follows the journey from first search to checkout.</p>
          <div className="as-audit-invitation"><p>We start with a 15-minute conversation. Then a closer look at your account and store, with a personal video to make sense of it all.</p><StoryLink href="/book-a-call?type=audit" className="cj-service-link">Start with your store <span aria-hidden="true">↗</span></StoryLink><StoryLink href="/revenue-leak-audit">Inside the audit <span aria-hidden="true">↗</span></StoryLink></div>
        </div>
        <AuditFolio />
      </div>
      <div className="as-questions" aria-label="Common questions">
        {questions.map(question => <details key={question.title}>
          <summary>{question.title}<span aria-hidden="true" className="as-disclosure-mark" /></summary>
          <p>{question.answer}</p>
        </details>)}
      </div>
    </section>
  );
}

export function AgencyFooter() {
  return <footer className="as-footer">
    <div className="as-footer-intro"><Wordmark /><p>Google Ads. Shopify.<br />Better Mondays.</p></div>
    <nav aria-label="Services"><StoryLink href="/google-ads-for-shopify-brands">Google Ads for Shopify</StoryLink><StoryLink href="/revenue-leak-audit">Revenue Leak Audit</StoryLink><StoryLink href="/pricing">Pricing</StoryLink></nav>
    <nav aria-label="About Happy Mondays"><StoryLink href="/case-studies">Client stories</StoryLink><StoryLink href="/about">Our team</StoryLink><StoryLink href="/articles">Blog</StoryLink></nav>
    <a href="#ha-top" className="as-back-top">Back to top <span aria-hidden="true">↑</span></a>
  </footer>;
}
