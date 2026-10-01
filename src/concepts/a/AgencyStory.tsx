import { useState, type ReactNode } from "react";
import { useToast } from "../../components/Toast";
import { Wordmark } from "../../components/Brand";
import "./agency-story.css";

/** Real route targets remain inspectable while this is a design review. */
export function StoryLink({ href, children, className = "as-link" }: { href: string; children: ReactNode; className?: string }) {
  const { show } = useToast();
  return <a href={href} className={className} onClick={event => {
    event.preventDefault();
    show(href.startsWith("/book-a-call")
      ? "Booking preview — the calendar will be connected before launch."
      : "This page is part of the full site build.");
  }}>{children}</a>;
}

export function ClientStory() {
  return (
    <section className="as-proof" id="client-stories" aria-label="A word from The Diamond Store">
      <div className="as-proof-brand"><span>The</span><strong>Diamond Store</strong></div>
      <figure>
        <blockquote>“Their knowledge of Google Ads is second to none and they are constantly finding new ways to scale and grow.”</blockquote>
        <figcaption><span><strong>Gary Ingram</strong><span>Co-Founder, The Diamond Store</span></span>
          <StoryLink href="/case-studies/the-diamond-store">Read their story <span aria-hidden="true">↗</span></StoryLink>
        </figcaption>
      </figure>
    </section>
  );
}

const bands = [
  { spend: "10,000–30,000", fee: "1,997" },
  { spend: "30,000–60,000", fee: "2,997" },
  { spend: "60,000–100,000", fee: "3,997" },
];

export function ClearPricing() {
  const [currency, setCurrency] = useState<"USD" | "GBP">("USD");
  const symbol = currency === "USD" ? "$" : "£";
  return (
    <section className="as-pricing" id="fees" aria-labelledby="as-pricing-title">
      <div className="as-pricing-copy">
        <h2 id="as-pricing-title"><span>Room to grow.</span><br />A fee you know.</h2>
        <p>A fixed monthly fee for your ad spend band. So you can plan ahead, and we can focus on where your budget works hardest.</p>
        <StoryLink href="/pricing" className="cj-service-link">Explore pricing <span aria-hidden="true">↗</span></StoryLink>
        <div className="as-pricing-principle"><span aria-hidden="true">↗</span><p>Grow within your band.<br /><strong>Your management fee stays the same.</strong></p></div>
      </div>
      <div className="as-fee-sheet">
        <div className="as-fee-top"><span>Monthly management</span>
          <div className="as-currency" role="group" aria-label="Pricing currency">
            {(["USD", "GBP"] as const).map(unit => <button key={unit} type="button" aria-pressed={unit === currency} onClick={() => setCurrency(unit)}>{unit}</button>)}
          </div>
        </div>
        <table>
          <caption className="as-sr-only">Monthly ad spend and management fees in {currency}</caption>
          <thead><tr><th scope="col">Your monthly ad spend</th><th scope="col">Our monthly fee</th></tr></thead>
          <tbody>{bands.map(band => <tr key={band.fee}><th scope="row">{symbol}{band.spend}</th><td>{symbol}{band.fee}</td></tr>)}
            <tr className="as-custom"><th scope="row">Above {symbol}100,000</th><td><StoryLink href="/book-a-call">Let’s talk <span aria-hidden="true">↗</span></StoryLink></td></tr>
          </tbody>
        </table>
        <p className="as-fee-note">Consistently above your band? We decide together whether to scale up or focus on efficiency. A busier month alone doesn’t change your fee.</p>
      </div>
    </section>
  );
}

const questions = [
  { title: "Is Happy Mondays right for my store?", answer: "We work with Shopify brands already running Google Ads, with historical data to learn from. Typically, that means at least 10,000 a month in ad spend in your local currency. If you’re below that with room to grow, we can talk it through." },
  { title: "Do you look beyond Google Ads?", answer: "Yes. We look at the account alongside your product pages, conversion rate and pricing. Better results depend on both. For paid social and email, we work with specialist partners." },
  { title: "How will I know what’s happening?", answer: "You have live dashboards, a Monday metrics update and a weekly written recap: what happened, the key numbers, what we’re working on and anything we need from you. Calls have a purpose, rather than filling the calendar." },
  { title: "What do I receive with the audit?", answer: "A detailed PDF and a personal Loom walkthrough explaining what we found and what to prioritise. We begin with a 15-minute conversation, then request access to Google Ads and, ideally, Shopify." },
];

export function GettingStarted() {
  return (
    <section className="as-start" id="getting-started" aria-labelledby="as-start-title">
      <div className="as-start-heading"><h2 id="as-start-title"><span>See what’s possible.</span><br />Start with your store.</h2>
        <p>The Revenue Leak Audit gives us something real to talk about. Your account, your store, and the opportunities between them.</p>
      </div>
      <div className="as-start-grid">
        <div className="as-first-steps">
          <ol>
            <li><span aria-hidden="true">01</span><div><h3>A conversation first.</h3><p>Spend 15 minutes with Keanu. Tell us where you are and what you want to change.</p></div></li>
            <li><span aria-hidden="true">02</span><div><h3>Then, a proper look.</h3><p>We review your ad account and store, then walk you through the findings in a personal video.</p></div></li>
            <li><span aria-hidden="true">03</span><div><h3>Decide with a clearer picture.</h3><p>Understand what needs attention before deciding whether we’re the team to help.</p></div></li>
          </ol>
          <StoryLink href="/book-a-call?type=audit" className="ha-button">Let’s look at your store <span aria-hidden="true">↗</span></StoryLink>
          <StoryLink href="/revenue-leak-audit">Explore the audit</StoryLink>
        </div>
        <div className="as-questions" aria-label="Common questions">
          {questions.map(question => <details key={question.title}>
            <summary>{question.title}<span aria-hidden="true" className="as-disclosure-mark" /></summary>
            <p>{question.answer}</p>
          </details>)}
          <p className="as-question-note">Something else on your mind? <StoryLink href="/book-a-call">Let’s talk.</StoryLink></p>
        </div>
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
